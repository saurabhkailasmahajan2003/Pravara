import React from 'react';
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
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  TrendingUp,
  Menu
} from 'lucide-react';

// --- Theme & Colors ---
const COLORS = {
  primary: "#2B2B2B",   // Darkest (Text/Main Bars)
  secondary: "#525252", // Medium Dark
  tertiary: "#737373",  // Medium
  quaternary: "#A3A3A3",// Light Medium
  light: "#D4D4D4",     // Lightest
  accent: "#10B981",    // Emerald (Positive)
  danger: "#EF4444",    // Red (Negative)
  bg: "#F9FAFB",        // Background
  card: "#FFFFFF",      // Card Bg
  border: "#E5E7EB"     // Border
};

// Grayscale Palette for charts
const CHART_COLORS = [COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.quaternary, COLORS.light];

// --- Data Sets ---

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
  { name: "Housing", value: 40, color: COLORS.primary },
  { name: "Transport", value: 25, color: COLORS.secondary },
  { name: "Leisure", value: 20, color: COLORS.tertiary },
  { name: "Food", value: 10, color: COLORS.quaternary },
  { name: "Other", value: 5, color: COLORS.light },
];

const metricCards = [
  { title: "Total Income", value: 384567.45, change: "+8.7%", changeColor: "text-emerald-600 bg-emerald-50" },
  { title: "Total Expenses", value: 328942.6, change: "-6.3%", changeColor: "text-emerald-600 bg-emerald-50" },
  { title: "Net Profit", value: 55624.85, change: "+21.4%", changeColor: "text-emerald-600 bg-emerald-50" },
];

// --- Advanced Chart Data ---

// 1. Composed Chart: Operating Margin Trends
const marginData = [
  { month: 'Q1', revenue: 120, margin: 22 },
  { month: 'Q2', revenue: 132, margin: 28 },
  { month: 'Q3', revenue: 145, margin: 35 },
  { month: 'Q4', revenue: 160, margin: 42 },
];

// 2. Bar Chart: Budget vs Actuals
const budgetData = [
  { dept: 'Ops', budget: 45, actual: 42 },
  { dept: 'Mktg', budget: 30, actual: 35 },
  { dept: 'Sales', budget: 25, actual: 24 },
  { dept: 'R&D', budget: 20, actual: 18 },
];

// 3. Donut Chart: Liability Structure
const debtData = [
  { name: 'Short-term', value: 300 },
  { name: 'Long-term', value: 800 },
  { name: 'Payables', value: 250 },
  { name: 'Credit', value: 150 },
];

// 4. Funnel
const funnelData = [
  { name: "Leads", value: 1000 },
  { name: "Qualified", value: 750 },
  { name: "Proposal", value: 500 },
  { name: "Negotiation", value: 250 },
  { name: "Closed", value: 100 },
];

// 5. Gauge
const gaugeData = [
  { name: 'L1', value: 10, fill: '#E5E7EB' },
  { name: 'Score', value: 78, fill: COLORS.primary },
];

// 6. Radar: Financial Health
const healthData = [
  { subject: 'Liquidity', A: 120, fullMark: 150 },
  { subject: 'Solvency', A: 98, fullMark: 150 },
  { subject: 'Efficiency', A: 86, fullMark: 150 },
  { subject: 'Profitability', A: 99, fullMark: 150 },
  { subject: 'Growth', A: 85, fullMark: 150 },
  { subject: 'Cash Flow', A: 65, fullMark: 150 },
];

// --- Utilities ---
const incomeTotal = incomeBreakdown.reduce((sum, item) => sum + item.value, 0);
const expenseTotalTransactions = 130;

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatCompact = (amount) =>
  `₹${(amount / 1000).toFixed(1)}k`;

// --- Components ---

const Card = ({ title, subtitle, children, className = "" }) => (
  <article className={`rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm flex flex-col ${className}`}>
    <div className="mb-4 flex items-center justify-between shrink-0">
      <div>
        <h3 className="text-sm font-bold text-[#2B2B2B]">{title}</h3>
        {subtitle && <p className="text-xs text-[#737373] mt-0.5">{subtitle}</p>}
      </div>
    </div>
    <div className="flex-grow min-h-0">
      {children}
    </div>
  </article>
);

const FinancialRoadmap = () => {
  const tasks = [
    { name: "Q1 Tax Filing", start: 0, duration: 25, color: "bg-[#2B2B2B]" },
    { name: "Portfolio Rebalance", start: 30, duration: 15, color: "bg-[#525252]" },
    { name: "Audit Prep", start: 50, duration: 30, color: "bg-[#737373]" },
    { name: "Year End Close", start: 85, duration: 15, color: "bg-[#A3A3A3]" },
  ];

  return (
    <div className="flex flex-col h-full justify-center space-y-5">
      {tasks.map((task, idx) => (
        <div key={idx} className="relative">
          <div className="flex justify-between text-[10px] mb-1.5 text-[#525252] font-bold uppercase tracking-wider">
            <span>{task.name}</span>
          </div>
          <div className="w-full bg-[#F3F4F6] rounded-sm h-2 relative overflow-hidden">
            <div 
              className={`absolute h-full rounded-sm ${task.color}`} 
              style={{ left: `${task.start}%`, width: `${task.duration}%` }}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-2 border-t border-[#E5E7EB] pt-2 font-mono">
        <span>Jan</span>
        <span>Apr</span>
        <span>Jul</span>
        <span>Oct</span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans pb-12 text-[#2B2B2B]">
      {/* --- Header --- */}
      <header className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md px-4 py-4 sm:px-6">
        
      </header>

      <main className="max-w-[1800px] mx-auto grid gap-6 px-4 py-8 sm:px-6 lg:px-8">
        
        {/* SECTION 1: Summary & Main Metrics */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-[2fr_1fr]">
          
          {/* Main Bar Chart */}
          <Card title="Monthly Cash Flow" subtitle="Income vs Expenses" className="lg:row-span-2 h-[400px] lg:h-auto min-h-[400px]">
            <div className="h-full w-full">
              <ResponsiveContainer>
                <BarChart data={monthlySummary} margin={{ top: 20, right: 0, left: -15, bottom: 0 }} barGap={6}>
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF" 
                    tick={{ fill: "#525252", fontSize: 11 }} 
                    axisLine={false} tickLine={false} dy={10}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    tick={{ fill: "#525252", fontSize: 11 }} 
                    tickFormatter={(val) => `₹${val}k`}
                    axisLine={false} tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#F3F4F6" }}
                    contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px", fontSize: "12px" }} iconType="circle" />
                  <Bar dataKey="income" name="Income" fill={COLORS.primary} radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="expense" name="Expenses" fill={COLORS.light} radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Metric Cards */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-1">
            {metricCards.map((card) => (
              <div key={card.title} className="flex flex-col justify-center rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#737373]">{card.title}</p>
                  {card.title.includes("Net") && <Activity size={16} className="text-[#2B2B2B]" />}
                </div>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-xl font-bold text-[#2B2B2B]">{formatCurrency(card.value)}</p>
                  <span className={`rounded-md px-2 py-1 text-[0.6rem] font-bold ${card.changeColor}`}>
                    {card.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

           {/* Radial Gauge */}
           <div className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm flex items-center justify-between relative overflow-hidden min-h-[140px]">
             <div className="z-10">
               <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#737373]">Financial Health</p>
               <h3 className="text-3xl font-bold text-[#2B2B2B] mt-2">78<span className="text-base text-[#A3A3A3]">/100</span></h3>
               <p className="text-xs font-bold text-emerald-600 mt-1">Solid Stability</p>
             </div>
             <div className="h-24 w-24 -mr-2">
               <ResponsiveContainer width="100%" height="100%">
                 <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" barSize={10} data={gaugeData} startAngle={180} endAngle={0}>
                   <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                 </RadialBarChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* SECTION 2: Detail Breakdown */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card title="Income Overview" subtitle="Revenue Sources" className="h-auto">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="text-center sm:text-left">
                   <p className="text-2xl font-bold text-[#2B2B2B]">{formatCurrency(incomeTotal)}</p>
                   <p className="text-xs text-[#737373] mt-1">Total Gross Income</p>
                </div>
                <div className="flex-grow w-full space-y-5">
                  {incomeBreakdown.map((item, index) => {
                    const percentage = Math.round((item.value / incomeTotal) * 100);
                    return (
                      <div key={item.label} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#525252]">{item.label}</span>
                          <span className="font-bold text-[#2B2B2B]">{formatCompact(item.value)} <span className="text-[#A3A3A3] ml-1">({percentage}%)</span></span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F3F4F6]">
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
            </div>
          </Card>

          <Card title="Expense Analysis" subtitle="Transaction Volume" className="h-auto min-h-[320px]">
            <div className="h-[200px] w-full mt-2">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB", borderRadius: "8px", fontSize: "12px" }} />
                  <Pie
                    data={expenseBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60} 
                    outerRadius={80} 
                    stroke="#FFFFFF"
                    strokeWidth={3}
                  >
                    {expenseBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#2B2B2B" fontSize="20" fontWeight="800">
                    {expenseTotalTransactions}
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
               {expenseBreakdown.slice(0,3).map(item => (
                 <div key={item.name} className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wide text-[#737373]">
                   <span className="h-2 w-2 rounded-full" style={{backgroundColor: item.color}} />
                   {item.name}
                 </div>
               ))}
            </div>
          </Card>
        </div>

        {/* SECTION 3: Advanced Analytics */}
        {/* Changed fixed height h-[350px] to responsive classes */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          
          {/* 1. Operating Margins */}
          <Card title="Operating Margins" subtitle="Rev vs Profit" className="h-80">
            <div className="h-full pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={marginData} margin={{top: 10, right: 0, left: -15, bottom: 0}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 10}} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 10}} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: COLORS.accent, fontSize: 10}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', borderColor: '#E5E7EB' }} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar yAxisId="left" dataKey="revenue" name="Rev (k)" fill={COLORS.primary} barSize={24} radius={[4,4,0,0]} />
                  <Line yAxisId="right" type="monotone" dataKey="margin" name="Margin %" stroke={COLORS.accent} strokeWidth={3} dot={{r:4, fill: COLORS.accent, strokeWidth: 2, stroke: '#fff'}} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

           {/* 2. Budget Variance */}
           <Card title="Budget Variance" subtitle="Actual vs Plan (k)" className="h-80">
            <div className="h-full pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 10}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', borderColor: '#E5E7EB' }} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="budget" name="Budget" fill={COLORS.light} radius={[2,2,0,0]} barSize={20} />
                  <Bar dataKey="actual" name="Actual" fill={COLORS.secondary} radius={[2,2,0,0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* 3. Liability Structure */}
          <Card title="Liability Structure" subtitle="Debt Distribution" className="h-80">
            <div className="h-full pb-4 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={debtData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {debtData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', borderColor: '#E5E7EB' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
              {/* Centered Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                 <div className="text-center">
                   <span className="block text-xs text-gray-400 font-bold uppercase">Total</span>
                   <span className="block text-xl font-bold text-[#2B2B2B]">1.5M</span>
                 </div>
              </div>
            </div>
          </Card>
        </div>

        {/* SECTION 4: Strategy & Pipeline */}
        {/* Changed fixed height h-[320px] to responsive classes */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <Card title="Financial Resilience" subtitle="Performance" className="h-80">
            <div className="h-full pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={healthData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#525252', fontSize: 10, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Current" dataKey="A" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.4} />
                  <Tooltip contentStyle={{ borderRadius: '8px', borderColor: '#E5E7EB' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

           <Card title="Sales Pipeline" subtitle="Lead Funnel" className="h-80">
             <div className="h-full pb-4">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={funnelData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorFunnel" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.6}/>
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 10}} />
                    <Tooltip contentStyle={{ borderRadius: '8px', borderColor: '#E5E7EB' }} />
                    <Area type="monotone" dataKey="value" stroke={COLORS.primary} fillOpacity={1} fill="url(#colorFunnel)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
           </Card>

           <Card title="Fiscal Roadmap" subtitle="Q3-Q4 Milestones" className="h-80">
              <FinancialRoadmap />
           </Card>
        </div>
      </main>
    </div>
  );
}