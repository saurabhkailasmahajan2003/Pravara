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

export default function FinancialAnalytics() {
  return (
    <section className="rounded-3xl card-neon text-white shadow-2xl">
      <header className="flex flex-col gap-2 border-b border-[#A020F0]/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#A0A0A0]">Analytics · Summary</p>
          <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">Financial analytics</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-[0.65rem] font-medium text-white">
          <span className="rounded-full glass px-2.5 py-1">All accounts</span>
          <span className="rounded-full glass px-2.5 py-1">Monthly</span>
          <span className="rounded-full glass px-2.5 py-1">2024</span>
        </div>
      </header>

      <div className="grid gap-4 px-4 py-4 lg:grid-cols-[2.1fr_0.9fr]">
        <article className="rounded-2xl glass-card p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A0A0A0]">Monthly Income & Expenses</h3>
              <p className="text-[0.65rem] text-[#A0A0A0]">Income vs expenses · Jan - Dec</p>
            </div>
          </div>
          <div className="mt-4 h-44">
            <ResponsiveContainer>
              <BarChart 
                data={monthlySummary} 
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                barCategoryGap="15%"
                barGap={8}
              >
                <CartesianGrid stroke="rgba(160, 32, 240, 0.2)" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  stroke="#A0A0A0" 
                  tick={{ fill: "#A0A0A0", fontSize: 10 }} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#A0A0A0" 
                  tick={{ fill: "#A0A0A0", fontSize: 10 }} 
                  tickFormatter={(value) => `₹${value}L`}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value, name) => {
                    const formattedValue = `₹${Number(value).toFixed(2)}L`;
                    return [formattedValue, name === "income" ? "Income" : "Expenses"];
                  }}
                  labelFormatter={(label) => `${label} 2024`}
                  contentStyle={{ 
                    backgroundColor: "rgba(26, 26, 26, 0.95)", 
                    borderColor: "rgba(160, 32, 240, 0.3)", 
                    borderRadius: "12px", 
                    color: "#FFFFFF",
                    padding: "8px 12px"
                  }}
                  itemStyle={{ padding: "4px 0" }}
                />
                <Legend 
                  iconType="circle" 
                  wrapperStyle={{ color: "#FFFFFF", paddingTop: "5px", fontSize: "12px" }} 
                />
                <Bar 
                  dataKey="income" 
                  name="Income" 
                  fill="#A020F0" 
                  radius={[4, 4, 0, 0]}
                  style={{ filter: 'drop-shadow(0 0 4px rgba(160, 32, 240, 0.5))' }}
                />
                <Bar 
                  dataKey="expense" 
                  name="Expenses" 
                  fill="#FF00CC" 
                  radius={[4, 4, 0, 0]}
                  style={{ filter: 'drop-shadow(0 0 4px rgba(255, 0, 204, 0.5))' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <aside className="grid gap-3">
          {metricCards.map((card) => (
            <div key={card.title} className="rounded-2xl glass-card p-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#A0A0A0]">{card.title}</p>
              <p className="mt-2 text-xl font-semibold text-white">{formatCurrency(card.value)}</p>
              <span className={`mt-1.5 inline-flex items-center gap-2 rounded-full glass px-2.5 py-1 text-[0.65rem] font-semibold ${card.tone}`}>
                {card.change}
              </span>
            </div>
          ))}
        </aside>
      </div>

      <div className="grid gap-4 border-t border-[#A020F0]/20 px-4 py-4 lg:grid-cols-3">
        <article className="rounded-2xl glass-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A0A0A0]">Income Overview</h3>
            <span className="rounded-full glass px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#A0A0A0]">
              Categories
            </span>
          </div>
          <p className="mt-3 text-xl font-semibold text-white">{formatCurrency(incomeTotal)}</p>
          <div className="mt-3 space-y-2.5">
            {incomeBreakdown.map((item, index) => {
              const percentage = Math.round((item.value / incomeTotal) * 100);
              const colors = ["#A020F0", "#D400FF", "#FF00CC"];
              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-white">
                    <span className="font-medium">{item.label}</span>
                    <span className="font-semibold text-[0.65rem]">{formatCurrency(item.value)} ({percentage}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: colors[index % colors.length],
                        boxShadow: `0 0 10px ${colors[index % colors.length]}40`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl glass-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A0A0A0]">Expense Analysis</h3>
            <span className="rounded-full glass px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#A0A0A0]">
              Transactions
            </span>
          </div>
          <div className="mt-4 h-36">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ backgroundColor: "rgba(26, 26, 26, 0.95)", borderColor: "rgba(160, 32, 240, 0.3)", borderRadius: "12px", color: "#FFFFFF" }}
                />
                <Pie
                  data={expenseBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="90%"
                  strokeWidth={0}
                >
                  {expenseBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="600">
                  {expenseTotalTransactions} Total
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid gap-1.5 text-[0.65rem] text-white">
            {expenseBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl glass-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A0A0A0]">Financial Forecast</h3>
            <span className="rounded-full glass px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#A0A0A0]">
              May focus
            </span>
          </div>
          <div className="mt-4 h-36">
            <ResponsiveContainer>
              <LineChart data={forecastData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A020F0" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#FF00CC" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(160, 32, 240, 0.2)" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  stroke="#A0A0A0" 
                  tick={{ fill: "#A0A0A0", fontSize: 10 }} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#A0A0A0" 
                  tick={{ fill: "#A0A0A0", fontSize: 10 }} 
                  tickFormatter={(value) => `₹${value}L`}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value, name) => [`₹${Number(value).toFixed(1)}L`, name === "income" ? "Income" : "Expenses"]}
                  contentStyle={{ 
                    backgroundColor: "rgba(26, 26, 26, 0.95)", 
                    borderColor: "rgba(160, 32, 240, 0.3)", 
                    borderRadius: "12px", 
                    color: "#FFFFFF",
                    padding: "8px 12px"
                  }}
                  itemStyle={{ padding: "4px 0" }}
                />
                <Legend 
                  iconType="line" 
                  wrapperStyle={{ color: "#FFFFFF", fontSize: "12px", paddingTop: "5px" }} 
                />
                <ReferenceLine 
                  x="May" 
                  stroke="#A0A0A0" 
                  strokeWidth={1.5} 
                  strokeDasharray="3 3"
                  label={{ 
                    value: "May", 
                    position: "top", 
                    fill: "#FFFFFF",
                    fontSize: 11,
                    fontWeight: 600,
                    backgroundColor: "rgba(26, 26, 26, 0.8)",
                    padding: "4px 8px",
                    borderRadius: "6px"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="none"
                  fill="url(#forecastGradient)"
                  fillOpacity={0.3}
                />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  name="Income" 
                  stroke="#A020F0" 
                  strokeWidth={3}
                  dot={{ fill: "#A020F0", r: 4, strokeWidth: 2, stroke: "#000000" }}
                  activeDot={{ r: 6, fill: "#A020F0" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expense" 
                  name="Expenses" 
                  stroke="#FF00CC" 
                  strokeWidth={3}
                  dot={{ fill: "#FF00CC", r: 4, strokeWidth: 2, stroke: "#000000" }}
                  activeDot={{ r: 6, fill: "#FF00CC" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-[0.65rem] text-[#A0A0A0] leading-relaxed">
            Expecting deficit in May. Consider saving more in April or optimizing leisure expenses.
          </p>
        </article>
      </div>
    </section>
  );
}