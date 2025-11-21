import AnalyticsSnapshot from '../models/AnalyticsSnapshot.js';

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function percentChange(current, previous) {
  if (previous === 0 || previous == null) return null;
  return (((current - previous) / previous) * 100).toFixed(1);
}

function formatPeriod(period) {
  const [year, month] = period.split('-').map(Number);
  if (!year || !month) return period;
  return `${MONTH_SHORT[month - 1]} ${String(year).slice(-2)}`;
}

async function ensureSeedData() {
  const count = await AnalyticsSnapshot.countDocuments();
  if (count > 0) return;

  const baseYear = new Date().getFullYear();
  const baseMonth = new Date().getMonth();

  const seeds = Array.from({ length: 8 }).map((_, idx) => {
    const date = new Date(baseYear, baseMonth - (7 - idx), 1);
    const period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const visitors = 12000 + idx * 850 + Math.floor(Math.random() * 800);
    const productViews = Math.round(visitors * 0.78);
    const addToCart = Math.round(productViews * (0.32 - idx * 0.005));
    const checkout = Math.round(addToCart * 0.68);
    const completedOrders = Math.round(checkout * (0.89 + idx * 0.002));
    const totalSales = 400 + idx * 35 + Math.floor(Math.random() * 40);
    const revenue = completedOrders * (120 + idx * 3);
    const orders = completedOrders;
    const avgOrderValue = orders ? Math.round((revenue / orders) * 100) / 100 : 0;
    const newCustomers = Math.round(orders * 0.42);
    const returningCustomers = orders - newCustomers;
    const lifetimeValue = Math.round(avgOrderValue * (2.5 + idx * 0.1));
    const retentionRate = Math.min(95, 68 + idx * 2.3);
    const churnRate = Math.max(3, 100 - retentionRate - 2);

    return {
      period,
      totalSales,
      revenue,
      orders,
      newCustomers,
      returningCustomers,
      visitors,
      productViews,
      addToCart,
      checkout,
      completedOrders,
      avgOrderValue,
      lifetimeValue,
      retentionRate,
      churnRate,
    };
  });

  await AnalyticsSnapshot.insertMany(seeds);
}

export const getAnalyticsOverview = async (req, res) => {
  try {
    await ensureSeedData();
    const snapshots = await AnalyticsSnapshot.find().sort({ period: 1 });
    if (!snapshots.length) {
      return res.json({
        summary: {},
        charts: {},
      });
    }

    const latest = snapshots[snapshots.length - 1];
    const previous = snapshots[snapshots.length - 2];

    const summary = {
      totalSales: latest.totalSales,
      revenue: latest.revenue,
      revenueGrowthPct: previous ? percentChange(latest.revenue, previous.revenue) : null,
      newCustomers: latest.newCustomers,
      newCustomerGrowthPct: previous ? percentChange(latest.newCustomers, previous.newCustomers) : null,
      avgOrderValue: latest.avgOrderValue,
      orders: latest.orders,
      ordersGrowthPct: previous ? percentChange(latest.orders, previous.orders) : null,
    };

    const monthlySales = snapshots.map((snap) => ({
      month: formatPeriod(snap.period),
      sales: snap.totalSales,
      revenue: snap.revenue,
      orders: snap.orders,
    }));

    const visitorJourney = snapshots.map((snap) => ({
      month: formatPeriod(snap.period),
      visitors: snap.visitors,
      productViews: snap.productViews,
      addToCart: snap.addToCart,
      completedOrders: snap.completedOrders,
    }));

    const funnelStages = [
      { stage: 'Visitors', value: latest.visitors },
      { stage: 'Product Views', value: latest.productViews },
      { stage: 'Add to Cart', value: latest.addToCart },
      { stage: 'Checkout', value: latest.checkout },
      { stage: 'Completed Orders', value: latest.completedOrders },
    ];

    const retentionTrend = snapshots.map((snap) => ({
      month: formatPeriod(snap.period),
      retentionRate: snap.retentionRate,
      churnRate: snap.churnRate,
    }));

    const lifetimeValueTrend = snapshots.map((snap) => ({
      month: formatPeriod(snap.period),
      lifetimeValue: snap.lifetimeValue,
    }));

    const secondaryMetrics = {
      avgLifetimeRevenue: latest.lifetimeValue,
      retentionRate: latest.retentionRate,
      churnRate: latest.churnRate,
      conversionRate: latest.visitors ? ((latest.completedOrders / latest.visitors) * 100).toFixed(1) : null,
      repeatPurchaseRate:
        latest.orders && latest.returningCustomers != null
          ? ((latest.returningCustomers / latest.orders) * 100).toFixed(1)
          : null,
    };

    res.json({
      summary,
      monthlySales,
      visitorJourney,
      funnelStages,
      retentionTrend,
      lifetimeValueTrend,
      secondaryMetrics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const upsertAnalyticsSnapshot = async (req, res) => {
  try {
    const {
      period,
      totalSales,
      revenue,
      orders,
      newCustomers,
      returningCustomers,
      visitors,
      productViews,
      addToCart,
      checkout,
      completedOrders,
      avgOrderValue,
      lifetimeValue,
      retentionRate,
      churnRate,
    } = req.body || {};

    if (!period) {
      return res.status(400).json({ message: 'period is required (YYYY-MM format)' });
    }

    const payload = {
      totalSales,
      revenue,
      orders,
      newCustomers,
      returningCustomers,
      visitors,
      productViews,
      addToCart,
      checkout,
      completedOrders,
      avgOrderValue,
      lifetimeValue,
      retentionRate,
      churnRate,
    };

    const doc = await AnalyticsSnapshot.findOneAndUpdate(
      { period },
      payload,
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

