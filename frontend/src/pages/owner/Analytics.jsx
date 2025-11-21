import React, { useMemo, useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Activity,
  Calendar,
  ArrowRight,
  Package,
  Clock,
} from "lucide-react";

// --- 1. CONFIGURATION & THEME ---
const THEME = {
  primary: "#6366f1",   // Indigo 500
  secondary: "#0ea5e9", // Sky 500
  success: "#10b981",   // Emerald 500
  warning: "#f59e0b",   // Amber 500
  danger: "#ef4444",    // Red 500
  dark: "#1e293b",      // Slate 800
  grid: "#e2e8f0",      // Slate 200
  text: "#64748b",      // Slate 500
};

const PIE_COLORS = [THEME.primary, THEME.secondary, THEME.success, THEME.warning];

// --- 2. DATA SIMULATION ENGINE ---
// Generates raw transaction data to be analyzed
const generateRawData = () => {
  const data = [];
  const categories = ["Electronics", "Fashion", "Home", "Sports", "Beauty"];
  const regions = ["North America", "Europe", "Asia", "LatAm", "Pacific"];
  const statuses = ["Completed", "Processing", "Shipped", "Returns"];
  
  const today = new Date();
  
  // Generate 12 months of data
  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = monthDate.toLocaleString('default', { month: 'short' });
    
    // Random number of orders per month (fluctuating)
    const orderCount = Math.floor(Math.random() * 50) + 150 + (i * 10); 

    for (let j = 0; j < orderCount; j++) {
      data.push({
        id: `${monthName}-${j}`,
        date: monthDate,
        month: monthName,
        amount: Math.floor(Math.random() * 200) + 20, // Orders between $20 - $220
        category: categories[Math.floor(Math.random() * categories.length)],
        region: regions[Math.floor(Math.random() * regions.length)],
        status: Math.random() > 0.1 ? "Completed" : statuses[Math.floor(Math.random() * statuses.length)],
        hour: Math.floor(Math.random() * 24), // For hourly analysis
      });
    }
  }
  return data.reverse(); // Oldest first
};

export default function AnalyticsDashboard() {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setRawData(generateRawData());
      setLoading(false);
    }, 800); // Fake loading delay
  }, []);

  // --- 3. ANALYTICS CORE (AGGREGATION LOGIC) ---
  // This processes the raw list of orders into charts
  const analytics = useMemo(() => {
    if (rawData.length === 0) return null;

    // A. Summary KPIs
    const totalRevenue = rawData.reduce((acc, curr) => acc + curr.amount, 0);
    const totalOrders = rawData.length;
    const avgOrderValue = totalRevenue / totalOrders;
    
    // B. Monthly Trend (Area Chart)
    const monthlyMap = new Map();
    rawData.forEach(item => {
      if (!monthlyMap.has(item.month)) {
        monthlyMap.set(item.month, { month: item.month, revenue: 0, orders: 0, profit: 0 });
      }
      const entry = monthlyMap.get(item.month);
      entry.revenue += item.amount;
      entry.orders += 1;
      entry.profit += item.amount * 0.35; // Simulate 35% profit margin
    });
    const monthlyTrend = Array.from(monthlyMap.values());

    // C. Category Performance (Bar Chart)
    const categoryMap = new Map();
    rawData.forEach(item => {
      if (!categoryMap.has(item.category)) categoryMap.set(item.category, 0);
      categoryMap.set(item.category, categoryMap.get(item.category) + item.amount);
    });
    const categoryData = Array.from(categoryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // D. Region Radar (Radar Chart)
    const regionMap = new Map();
    rawData.forEach(item => {
      if (!regionMap.has(item.region)) regionMap.set(item.region, 0);
      regionMap.set(item.region, regionMap.get(item.region) + 1); // Count orders
    });
    const regionData = Array.from(regionMap.entries()).map(([subject, A]) => ({ subject, A, fullMark: 300 }));

    // E. Status Distribution (Pie Chart)
    const statusMap = new Map();
    rawData.forEach(item => {
      if (!statusMap.has(item.status)) statusMap.set(item.status, 0);
      statusMap.set(item.status, statusMap.get(item.status) + 1);
    });
    const statusData = Array.from(statusMap.entries()).map(([name, value]) => ({ name, value }));

    // F. Hourly Traffic (Bar Chart)
    const hourMap = new Array(24).fill(0);
    rawData.forEach(item => {
      hourMap[item.hour] += 1;
    });
    const hourlyData = hourMap.map((val, i) => ({ 
      hour: i === 0 ? '12AM' : i === 12 ? '12PM' : i > 12 ? `${i-12}PM` : `${i}AM`, 
      orders: val 
    }));

    return {
      kpi: { totalRevenue, totalOrders, avgOrderValue },
      monthlyTrend,
      categoryData,
      regionData,
      statusData,
      hourlyData
    };
  }, [rawData]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 font-sans text-slate-900">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics Overview</h1>
          <p className="text-slate-500 mt-2">Real-time insights generated from {rawData.length.toLocaleString()} transaction records.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setLoading(true); setTimeout(() => { setRawData(generateRawData()); setLoading(false); }, 500); }} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Activity size={16} /> Regenerate Data
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-indigo-700 transition-colors cursor-pointer">
            <Calendar size={16} /> Export Report
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          label="Total Revenue" 
          value={formatCurrency(analytics.kpi.totalRevenue)} 
          trend="+12.5%" 
          icon={DollarSign} 
          color="text-indigo-600" 
          bg="bg-indigo-50" 
        />
        <StatCard 
          label="Total Orders" 
          value={analytics.kpi.totalOrders.toLocaleString()} 
          trend="+8.2%" 
          icon={ShoppingBag} 
          color="text-sky-600" 
          bg="bg-sky-50" 
        />
        <StatCard 
          label="Avg. Order Value" 
          value={formatCurrency(analytics.kpi.avgOrderValue)} 
          trend="-2.4%" 
          isNegative 
          icon={Activity} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
        <StatCard 
          label="Active Shoppers" 
          value="1,204" 
          trend="+18%" 
          icon={Users} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* Chart 1: Revenue & Profit Trend */}
        <Card className="xl:col-span-2 min-h-[400px]">
          <CardHeader title="Financial Performance" subtitle="Revenue vs Profit (Trailing 12 Months)" />
          <div className="h-[350px] w-full mt-4 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthlyTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={THEME.primary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={THEME.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: THEME.text, fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: THEME.text, fontSize: 12 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip content={<CustomTooltip type="currency" />} />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke={THEME.primary} fill="url(#colorRevenue)" strokeWidth={3} />
                <Area type="monotone" dataKey="profit" name="Net Profit" stroke={THEME.success} fill="none" strokeWidth={3} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Category Distribution */}
        <Card className="min-h-[400px]">
          <CardHeader title="Top Categories" subtitle="Revenue share by product type" icon={Package} />
          <div className="h-[350px] w-full mt-4 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={analytics.categoryData} margin={{ top: 0, right: 30, left: 40, bottom: 0 }} barSize={30}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={THEME.grid} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: THEME.text, fontSize: 12, fontWeight: 500 }} width={80} />
                <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip type="currency" />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1500}>
                  {analytics.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Object.values(THEME)[index % 5]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 3: Hourly Activity */}
        <Card className="lg:col-span-1">
          <CardHeader title="Peak Shopping Hours" subtitle="Order volume by time of day" icon={Clock} />
          <div className="h-[250px] w-full mt-4 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.hourlyData}>
                <XAxis dataKey="hour" interval={3} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: THEME.text }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="orders" fill={THEME.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 4: Regional Reach */}
        <Card className="lg:col-span-1">
          <CardHeader title="Regional Reach" subtitle="Market penetration" icon={Activity} />
          <div className="h-[250px] w-full mt-4 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={analytics.regionData}>
                <PolarGrid stroke={THEME.grid} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: THEME.text, fontSize: 10, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                <Radar name="Orders" dataKey="A" stroke={THEME.secondary} fill={THEME.secondary} fillOpacity={0.4} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 5: Order Status */}
        <Card className="lg:col-span-1">
          <CardHeader title="Order Status" subtitle="Fulfillment health" />
          <div className="h-[250px] w-full mt-4 min-w-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics.statusData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {analytics.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </div>
  );
}

// --- 4. HELPER COMPONENTS ---

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col min-w-0 ${className}`}>{children}</div>;
}

function CardHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {Icon && <Icon className="text-slate-400" size={20} />}
    </div>
  );
}

function StatCard({ label, value, trend, isNegative, icon: Icon, color, bg }) {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${bg} ${color}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${isNegative ? "text-rose-600" : "text-emerald-600"}`}>
            {isNegative ? <TrendingDown size={16} className="mr-1" /> : <TrendingUp size={16} className="mr-1" />}
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label, type }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-slate-700 z-50">
        {label && <p className="font-semibold mb-2 text-slate-300 border-b border-slate-600 pb-1">{label}</p>}
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 my-1 min-w-[120px]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="text-slate-300 capitalize">{entry.name}:</span>
            </div>
            <span className="font-medium font-mono">
              {type === 'currency' ? formatCurrency(entry.value) : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function DashboardSkeleton() {
  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      <div className="h-10 w-64 bg-slate-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => <div key={i} className="h-40 bg-slate-200 rounded-xl animate-pulse" />)}
      </div>
      <div className="h-96 bg-slate-200 rounded-xl animate-pulse" />
    </div>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}