import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// --- Data ---

const monthlySummary = [
  { month: "Jan", income: 38.5, expense: 32.1 },
  { month: "Feb", income: 40.2, expense: 33.6 },
  { month: "Mar", income: 42.8, expense: 34.9 },
  { month: "Apr", income: 44.4, expense: 36.8 },
  { month: "May", income: 39.8, expense: 37.2 },
  { month: "Jun", income: 45.6, expense: 38.8 },
  { month: "Jul", income: 47.1, expense: 39.4 },
  { month: "Aug", income: 49.3, expense: 40.2 },
  { month: "Sep", income: 48.7, expense: 41.1 },
  { month: "Oct", income: 51.2, expense: 42.3 },
  { month: "Nov", income: 52.4, expense: 43.5 },
  { month: "Dec", income: 54.1, expense: 44.9 },
];

const incomeBreakdown = [
  { label: "Salary", value: 142000 },
  { label: "Business", value: 168000 },
  { label: "Investment", value: 74500 },
];

const expenseBreakdown = [
  { name: "Housing", value: 40, color: "#2B2B2B" },      // Darkest
  { name: "Transportation", value: 25, color: "#525252" },
  { name: "Entertainment", value: 20, color: "#737373" },
  { name: "Food", value: 10, color: "#A3A3A3" },
  { name: "Other", value: 5, color: "#D4D4D4" },        // Lightest
];

const forecastData = [
  { month: "Jan", income: 36, expense: 31 },
  { month: "Feb", income: 38, expense: 32 },
  { month: "Mar", income: 41, expense: 34 },
  { month: "Apr", income: 44, expense: 35 },
  { month: "May", income: 39, expense: 37 },
  { month: "Jun", income: 46, expense: 38 },
  { month: "Jul", income: 48, expense: 39 },
  { month: "Aug", income: 50, expense: 41 },
];

const metricCards = [
  { title: "Total Income", value: 384567.45, change: "+8.7%", changeColor: "text-emerald-600 bg-emerald-50" },
  { title: "Total Expenses", value: 328942.6, change: "-6.3%", changeColor: "text-emerald-600 bg-emerald-50" }, // Expenses down is good
  { title: "Total Net Income", value: 55624.85, change: "+21.4%", changeColor: "text-emerald-600 bg-emerald-50" },
];

const incomeTotal = incomeBreakdown.reduce((sum, item) => sum + item.value, 0);
const expenseTotalTransactions = 130;

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CHART_COLORS = ["#2B2B2B", "#525252", "#737373"]; // Professional Greyscale

export default function FinancialAnalyticsPanel() {
  return (
    <>
      {/* --- Header & Main Card --- */}
      <section className="rounded-xl border border-[#D4D4D4] bg-white shadow-sm">
        <header className="flex flex-col gap-4 border-b border-[#E5E7EB] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-md bg-[#F3F4F6] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#525252] sm:text-xs">
              Analytics · Summary
            </span>
            <h1 className="mt-3 text-2xl font-bold text-[#2B2B2B] sm:text-3xl">
              Financial analytics
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All accounts', 'Monthly', '2024'].map((filter) => (
              <button key={filter} className="rounded-md border border-[#D4D4D4] bg-white px-3 py-1.5 text-xs font-semibold text-[#525252] hover:bg-[#F9FAFB] hover:text-[#2B2B2B]">
                {filter}
              </button>
            ))}
          </div>
        </header>

        <div className="grid gap-6 px-6 py-6 lg:grid-cols-[2.1fr_0.9fr]">
          
          {/* Main Chart */}
          <article className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#2B2B2B]">Monthly Income & Expenses</h3>
              <p className="text-xs text-[#737373]">Income vs expenses · Jan - Dec</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart 
                  data={monthlySummary} 
                  margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                  barGap={8}
                >
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF" 
                    tick={{ fill: "#525252", fontSize: 11 }} 
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    tick={{ fill: "#525252", fontSize: 11 }} 
                    tickFormatter={(value) => `₹${value}k`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#F3F4F6" }}
                    contentStyle={{ 
                      backgroundColor: "#FFFFFF", 
                      borderColor: "#E5E7EB", 
                      borderRadius: "8px", 
                      color: "#2B2B2B",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                    }}
                    itemStyle={{ fontSize: "12px", fontWeight: "600" }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: "20px", fontSize: "12px" }}
                    iconType="circle"
                  />
                  <Bar 
                    dataKey="income" 
                    name="Income" 
                    fill="#2B2B2B" 
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Bar 
                    dataKey="expense" 
                    name="Expenses" 
                    fill="#9CA3AF" 
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          {/* Metric Cards */}
          <aside className="grid gap-4">
            {metricCards.map((card) => (
              <div key={card.title} className="flex flex-col justify-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#737373]">{card.title}</p>
                <p className="mt-2 text-xl font-bold text-[#2B2B2B]">{formatCurrency(card.value)}</p>
                <span className={`mt-2 inline-flex w-fit items-center rounded-md px-2 py-1 text-[0.65rem] font-bold ${card.changeColor}`}>
                  {card.change}
                </span>
              </div>
            ))}
          </aside>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid gap-6 border-t border-[#E5E7EB] px-6 py-6 lg:grid-cols-3">
          
          {/* Income Categories */}
          <article className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#2B2B2B]">Income Overview</h3>
              <span className="rounded-md bg-[#F3F4F6] px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-[#737373]">
                Categories
              </span>
            </div>
            <p className="text-2xl font-bold text-[#2B2B2B]">{formatCurrency(incomeTotal)}</p>
            <div className="mt-6 space-y-4">
              {incomeBreakdown.map((item, index) => {
                const percentage = Math.round((item.value / incomeTotal) * 100);
                return (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#525252]">{item.label}</span>
                      <span className="font-bold text-[#2B2B2B]">{formatCurrency(item.value)} <span className="text-[#9CA3AF]">({percentage}%)</span></span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#F3F4F6]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          {/* Expense Pie Chart */}
          <article className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#2B2B2B]">Expense Analysis</h3>
              <span className="rounded-md bg-[#F3F4F6] px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-[#737373]">
                Transactions
              </span>
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB", borderRadius: "8px", color: "#2B2B2B", fontSize: "12px" }}
                  />
                  <Pie
                    data={expenseBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  >
                    {expenseBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#2B2B2B" fontSize="14" fontWeight="700">
                    {expenseTotalTransactions}
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid gap-2 text-xs">
              {expenseBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between border-b border-[#F3F4F6] pb-1 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[#525252]">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#2B2B2B]">{item.value}%</span>
                </div>
              ))}
            </div>
          </article>

          {/* Forecast Line Chart */}
          <article className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#2B2B2B]">Forecast</h3>
              <span className="rounded-md bg-[#F3F4F6] px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-[#737373]">
                May focus
              </span>
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer>
                <LineChart data={forecastData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF" 
                    tick={{ fill: "#525252", fontSize: 10 }} 
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    tick={{ fill: "#525252", fontSize: 10 }} 
                    tickFormatter={(value) => `₹${value}k`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                     contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB", borderRadius: "8px", color: "#2B2B2B", fontSize: "12px" }}
                  />
                  <ReferenceLine 
                    x="May" 
                    stroke="#9CA3AF" 
                    strokeDasharray="3 3"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#2B2B2B" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expense" 
                    stroke="#9CA3AF" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[#525252]">
              <strong className="text-[#2B2B2B]">Insight:</strong> Expecting deficit in May. Consider saving more in April or optimizing leisure expenses.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}