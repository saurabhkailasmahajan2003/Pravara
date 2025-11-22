import React from 'react';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Theme Palette for JS usage (Charts)
const THEME = {
  primary: "#2B2B2B",   // Dark Charcoal
  secondary: "#B3B3B3", // Medium Gray
  accent: "#D4D4D4",    // Light Gray
  text: "#2B2B2B",
  grid: "#E5E5E5"
};

const topLineData = [
  { month: "Jan", totalSales: 320 },
  { month: "Feb", totalSales: 360 },
  { month: "Mar", totalSales: 410 },
  { month: "Apr", totalSales: 455 },
  { month: "May", totalSales: 520 },
  { month: "Jun", totalSales: 565 },
];

const summaryStats = [
  { label: "Revenue", value: "₹320.4K", trend: "+8.2%", trendTone: "text-emerald-600", progress: 78, progressTone: "bg-gray-800" },
  { label: "Orders", value: "31.6K", trend: "+3.4%", trendTone: "text-emerald-600", progress: 64, progressTone: "bg-gray-600" },
  { label: "Avg. Order Value", value: "₹4.2K", trend: "+₹0.12K", trendTone: "text-emerald-600", progress: 55, progressTone: "bg-gray-400" },
  { label: "New Cust. Per Mo", value: "12.6K", trend: "+1.9K", trendTone: "text-emerald-600", progress: 82, progressTone: "bg-gray-800" },
];

const funnelStages = [
  { step: "Visitors", value: "256.2K", conversion: "50.4% to Activity" },
  { step: "Product Views", value: "198.4K", conversion: "To cart initiation 32.1%" },
  { step: "Add to Cart", value: "139.2K", conversion: "Cart conversion 24.2%" },
  { step: "Check Out", value: "9.4K", conversion: "Checkout abandonment 6.4%" },
  { step: "Complete Order", value: "5.9K", conversion: "Final conversion 3.8%" },
];

const lifetimeRevenueData = [
  { month: "Jan", newCustomers: 120, returningCustomers: 80 },
  { month: "Feb", newCustomers: 180, returningCustomers: 120 },
  { month: "Mar", newCustomers: 260, returningCustomers: 190 },
  { month: "Apr", newCustomers: 310, returningCustomers: 240 },
  { month: "May", newCustomers: 370, returningCustomers: 280 },
  { month: "Jun", newCustomers: 420, returningCustomers: 320 },
];

const retentionMatrix = [
  { month: "Jan", cohorts: ["100%", "88.7%", "82.1%", "74.5%", "68.0%", "61.4%"] },
  { month: "Feb", cohorts: ["100%", "90.1%", "84.3%", "77.2%", "69.6%", "63.0%"] },
  { month: "Mar", cohorts: ["100%", "91.2%", "85.7%", "79.9%", "73.1%", "67.8%"] },
  { month: "Apr", cohorts: ["100%", "92.3%", "86.9%", "80.5%", "74.2%", "68.6%"] },
  { month: "May", cohorts: ["100%", "89.9%", "83.6%", "77.4%", "70.8%", "65.5%"] },
  { month: "Jun", cohorts: ["100%", "87.6%", "81.4%", "74.9%", "68.2%", "62.7%"] },
];

// Professional monochrome scale for retention heatmap
const retentionBgMap = (valueStr) => {
  const val = parseFloat(valueStr);
  if (val >= 100) return "bg-[#2B2B2B] text-white"; // Darkest
  if (val >= 90) return "bg-[#525252] text-white";
  if (val >= 80) return "bg-[#737373] text-white";
  if (val >= 70) return "bg-[#A3A3A3] text-black";
  if (val >= 60) return "bg-[#D4D4D4] text-black";
  return "bg-[#E5E5E5] text-black"; // Lightest
};

const areaData = [
  { name: "Step 1", value: 100 },
  { name: "Step 2", value: 78 },
  { name: "Step 3", value: 52 },
  { name: "Step 4", value: 28 },
  { name: "Step 5", value: 16 },
];

const kpiCards = [
  {
    title: "Conversion Rate",
    value: "3.8%",
    helper: "+0.6pp vs last month",
    badge: "Healthy",
    badgeTone: "bg-green-100 text-green-800 border border-green-200",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 3.75 4.5 12h6l-3.75 8.25L19.5 12h-6l3.75-8.25-5.25 6" />
      </svg>
    ),
  },
  {
    title: "Returning Customers",
    value: "58%",
    helper: "+4% QoQ",
    badge: "Growing",
    badgeTone: "bg-blue-100 text-blue-800 border border-blue-200",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v10.5m0 0 3.75-3.75M12 17.25 8.25 13.5M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
      </svg>
    ),
  },
  {
    title: "Average Basket",
    value: "₹148.90",
    helper: "+₹12 vs goal",
    badge: "Above target",
    badgeTone: "bg-gray-100 text-gray-800 border border-gray-200",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2.25l1.5 12.75A2.25 2.25 0 0 0 8.99 18h6.02a2.25 2.25 0 0 0 2.24-2.25L18.75 6H5.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8.25 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      </svg>
    ),
  },
];

const actionItems = [
  {
    title: "Launch A/B test on checkout copy",
    owner: "Growth Team",
    due: "Due tomorrow",
    tone: "border-l-4 border-[#2B2B2B] bg-white",
  },
  {
    title: "Review VIP loyalty tier pricing",
    owner: "Finance & CRM",
    due: "Due Friday",
    tone: "border-l-4 border-[#737373] bg-white",
  },
  {
    title: "Enable referral bonus tracking",
    owner: "Product Ops",
    due: "In progress",
    tone: "border-l-4 border-[#D4D4D4] bg-white",
  },
];

const retentionLegend = [
  { label: "95%+", tone: "bg-[#2B2B2B]" },
  { label: "85-95%", tone: "bg-[#737373]" },
  { label: "75-85%", tone: "bg-[#A3A3A3]" },
  { label: "<75%", tone: "bg-[#D4D4D4]" },
];

export default function Dashboard() {
  return (
<<<<<<< HEAD
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
=======
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 font-sans">
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
      <Navbar />
      <main className="flex grow">
        <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto">
          
          {/* HEADER */}
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6">
            <div>
<<<<<<< HEAD
              <h1 className="text-2xl font-semibold">Overview Dashboard</h1>
              <p className="text-sm text-gray-500">Sales overview · Jan 1, 2023 – Jun 30, 2023</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Last 6 months
              </button>
              <button className="rounded-md border border-blue-600 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50">
                Export
=======
              <h1 className="text-3xl font-bold text-[#2B2B2B] tracking-tight">Overview Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Sales overview · Jan 1, 2023 – Jun 30, 2023</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-neon-outline text-sm px-4 py-2 hover:bg-gray-100">
                Last 6 months
              </button>
              <button className="btn-neon-primary text-sm px-4 py-2 shadow-md hover:shadow-lg">
                Export Report
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
              </button>
            </div>
          </header>

          {/* KPI CARDS */}
          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {kpiCards.map((card) => (
              <article
                key={card.title}
<<<<<<< HEAD
                className={`rounded-lg border border-gray-200 bg-white p-5`}
              >
                <div className="relative flex items-start justify-between">
                  <div className="rounded-md bg-blue-50 p-2 text-blue-600">
                    {card.icon}
                  </div>
                  <span className={`rounded-full bg-gray-100 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gray-600`}>
                    {card.badge}
                  </span>
                </div>
                <h2 className="relative mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                  {card.title}
                </h2>
                <p className="relative mt-2 text-3xl font-semibold">{card.value}</p>
                <p className="relative mt-2 text-sm font-medium text-gray-500">{card.helper}</p>
=======
                className="relative overflow-hidden rounded-xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative flex items-start justify-between">
                  <div className="rounded-lg bg-gray-50 p-3 border border-gray-100">
                    {card.icon}
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider ${card.badgeTone}`}>
                    {card.badge}
                  </span>
                </div>
                <h2 className="mt-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                  {card.title}
                </h2>
                <div className="flex items-baseline gap-3 mt-2">
                  <p className="text-3xl font-bold text-[#2B2B2B]">{card.value}</p>
                  <p className="text-sm font-medium text-emerald-600">{card.helper}</p>
                </div>
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
              </article>
            ))}
          </section>

          {/* TOTAL SALES + SUMMARY */}
          <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
<<<<<<< HEAD
            <article className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Total Sales</p>
                  <h2 className="mt-2 text-3xl font-semibold">₹895.39K</h2>
                  <p className="text-xs text-gray-500">last 30 days · +12.5% vs previous period</p>
                </div>
                <div className="mt-3 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
=======
            {/* Main Chart Card */}
            <article className="rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Sales</p>
                  <h2 className="mt-2 text-3xl font-bold text-[#2B2B2B]">₹895.39K</h2>
                  <p className="text-xs text-gray-500 mt-1">last 30 days · <span className="text-emerald-600 font-medium">+12.5%</span> vs previous period</p>
                </div>
                <div className="mt-3 rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-200">
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                  Jan 1, 2023 – Jun 30, 2023
                </div>
              </div>

              <div className="mt-6 h-64">
                <ResponsiveContainer>
<<<<<<< HEAD
                  <BarChart data={topLineData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(99, 102, 241, 0.2)" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: "#6B7280" }} />
                    <YAxis stroke="#9CA3AF" tick={{ fill: "#6B7280" }} tickFormatter={(value) => `₹${value}K`} />
                <Tooltip
                    labelFormatter={(label) => `Month: ${label}`}
                    formatter={(value) => [`₹${value}K`, "Revenue"]} 
                    contentStyle={{
                    borderRadius: "1rem",
                    borderColor: "#E5E7EB",
                    backgroundColor: "#FFFFFF",
                    color: "#111827",
                    }}
                />

                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 8, color: "#111827" }} />
                    <Bar dataKey="totalSales" name="Revenue" fill="#6366F1" radius={[10, 10, 0, 0]} />
=======
                  <BarChart data={topLineData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke={THEME.grid} strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9CA3AF" 
                      tick={{ fill: "#6B7280", fontSize: 12 }} 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <YAxis 
                      stroke="#9CA3AF" 
                      tick={{ fill: "#6B7280", fontSize: 12 }} 
                      tickFormatter={(value) => `₹${value}K`} 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <Tooltip
                      cursor={{ fill: '#F3F4F6' }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        color: "#111827",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Bar 
                      dataKey="totalSales" 
                      name="Revenue" 
                      fill={THEME.primary} 
                      radius={[4, 4, 0, 0]} 
                      barSize={40}
                    />
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

<<<<<<< HEAD
            <article className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Summary</p>
              <p className="mt-2 text-xs text-gray-500">Jan 1, 2023 – Jun 30, 2023</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {summaryStats.map((stat) => (
                  <article key={stat.label} className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">{stat.label}</p>
                      <span className={`text-xs font-semibold text-emerald-600`}>{stat.trend}</span>
                    </div>
                    <p className="mt-3 text-xl font-semibold">{stat.value}</p>
                    <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
                      <div className={`h-2 rounded-full bg-indigo-500`} style={{ width: `${stat.progress}%` }} />
=======
            {/* Summary Card */}
            <article className="rounded-xl bg-white p-6 border border-gray-200 shadow-sm flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Performance Summary</p>
              
              <div className="flex flex-col gap-4 grow">
                {summaryStats.map((stat) => (
                  <div key={stat.label} className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[0.65rem] font-bold uppercase tracking-wider text-gray-500">{stat.label}</p>
                      <span className={`text-xs font-bold ${stat.trendTone}`}>{stat.trend}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-lg font-bold text-[#2B2B2B]">{stat.value}</p>
                      <div className="w-16 h-1.5 rounded-full bg-gray-200 mb-2">
                        <div className={`h-1.5 rounded-full ${stat.progressTone}`} style={{ width: `${stat.progress}%` }} />
                      </div>
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          {/* SALES FUNNEL + LTV */}
          <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            
            {/* SALES FUNNEL */}
<<<<<<< HEAD
            <article className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Sales Funnel</p>
                  <p className="text-xs text-gray-500">Jan 1, 2023 – Jun 30, 2023</p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    +4.8% completion
                  </span>
=======
            <article className="rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Sales Funnel</p>
                  <p className="text-xs text-gray-500 mt-1">Conversion health check</p>
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                   +4.8% completion
                </span>
              </div>

              <div className="h-48 mb-6">
                <ResponsiveContainer>
                  <AreaChart data={areaData}>
                    <defs>
<<<<<<< HEAD
                      <linearGradient id="funnelGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="50%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#6366F1" />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: "#6B7280", fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Stage completion"]}

                      contentStyle={{
                        borderRadius: "1rem",
                        borderColor: "#E5E7EB",
                        backgroundColor: "#FFFFFF",
                        color: "#111827"
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#6366F1" fill="url(#funnelGradient)" strokeWidth={0} />
=======
                      <linearGradient id="funnelGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={THEME.primary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={THEME.primary} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip
                       contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        color: "#111827",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={THEME.primary} 
                      fill="url(#funnelGradient)" 
                      strokeWidth={2} 
                    />
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                  </AreaChart>
                </ResponsiveContainer>
              </div>

<<<<<<< HEAD
              <div className="mt-6 grid gap-4 sm:grid-cols-5">
                {funnelStages.map((stage) => (
                  <div key={stage.step} className="flex flex-col gap-1 rounded-md border border-gray-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">{stage.step}</p>
                    <p className="text-lg font-semibold">{stage.value}</p>
                    <p className="text-[0.65rem] text-gray-500">{stage.conversion}</p>
                    <div className="mt-auto h-2 rounded-full bg-indigo-500" />
=======
              <div className="grid gap-3 sm:grid-cols-5">
                {funnelStages.map((stage) => (
                  <div key={stage.step} className="flex flex-col gap-1 rounded-lg bg-gray-50 p-3 border border-gray-100">
                    <p className="text-[0.6rem] font-bold uppercase tracking-wider text-gray-400 truncate">{stage.step}</p>
                    <p className="text-sm font-bold text-[#2B2B2B]">{stage.value}</p>
                    <p className="text-[0.6rem] text-gray-500 leading-tight">{stage.conversion}</p>
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                  </div>
                ))}
              </div>
            </article>

            {/* LIFETIME VALUE */}
<<<<<<< HEAD
            <article className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Average Lifetime Revenue</p>
                  <p className="text-xs text-gray-500">Jan 1, 2023 – Jun 30, 2023</p>
                </div>
                <span className="mt-3 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
=======
            <article className="rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Lifetime Value</p>
                  <p className="text-xs text-gray-500 mt-1">Customer cohort analysis</p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-200">
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                  +₹56K YoY
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer>
<<<<<<< HEAD
                  <LineChart data={lifetimeRevenueData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(99, 102, 241, 0.2)" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: "#6B7280" }} />
                    <YAxis stroke="#9CA3AF" tick={{ fill: "#6B7280" }} tickFormatter={(value) => `₹${value}K`} />
                    <Tooltip
                      labelFormatter={(label) => `Month: ${label}`}
                      formatter={(value, name) => [`₹${value}K`, name]}
                      contentStyle={{
                        borderRadius: "1rem",
                        borderColor: "#E5E7EB",
                        backgroundColor: "#FFFFFF",
                        color: "#111827"
                      }}
                    />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 8, color: "#111827" }} />
=======
                  <LineChart data={lifetimeRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke={THEME.grid} strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#9CA3AF" tick={{ fill: "#6B7280", fontSize: 12 }} tickFormatter={(value) => `₹${value}K`} axisLine={false} tickLine={false} />
                    <Tooltip
                       contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        color: "#111827",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 20, fontSize: '12px' }} />
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e

                    <Line
                      type="monotone"
                      dataKey="newCustomers"
<<<<<<< HEAD
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ r: 3, fill: "#10B981" }}
                      name="New customers"
=======
                      stroke={THEME.primary} // Dark Charcoal
                      strokeWidth={3}
                      dot={{ r: 4, fill: THEME.primary, strokeWidth: 0 }}
                      activeDot={{ r: 6 }}
                      name="New"
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                    />
                    <Line
                      type="monotone"
                      dataKey="returningCustomers"
<<<<<<< HEAD
                      stroke="#6366F1"
                      strokeWidth={3}
                      dot={{ r: 3, fill: "#6366F1" }}
                      name="Returning customers"
=======
                      stroke={THEME.accent} // Light Gray
                      strokeWidth={3}
                      dot={{ r: 4, fill: THEME.accent, strokeWidth: 0 }}
                      name="Returning"
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>

          {/* RETENTION + ACTION CENTER */}
          <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
<<<<<<< HEAD
            <article className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Customer Retention</p>
                  <p className="text-xs text-gray-500">Jan 1, 2023 – Jun 30, 2023</p>
                </div>
                <span className="mt-3 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
=======
            {/* Retention Matrix */}
            <article className="rounded-xl bg-white p-6 border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Customer Retention</p>
                  <p className="text-xs text-gray-500 mt-1">Weekly cohort breakdown</p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-200">
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                  87% avg retention
                </span>
              </div>

<<<<<<< HEAD
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-2 text-xs font-semibold uppercase tracking-[0.2em]">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-gray-500">Month</th>
                      {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"].map((label) => (
                        <th key={label} className="px-3 py-2 text-center text-gray-500">
=======
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-1">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Month</th>
                      {["W1", "W2", "W3", "W4", "W5", "W6"].map((label) => (
                        <th key={label} className="px-2 py-2 text-center text-xs font-bold text-gray-400">
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {retentionMatrix.map((row) => (
                      <tr key={row.month}>
<<<<<<< HEAD
                        <td className="px-3 py-2 text-left text-sm font-semibold">{row.month}</td>
                        {row.cohorts.map((value, idx) => (
                          <td key={`${row.month}-${idx}`} className="px-1 py-1 text-center">
                            <div className={`rounded-lg border border-indigo-100 bg-indigo-50 px-2 py-3 text-xs font-semibold text-indigo-700`}>
=======
                        <td className="px-2 py-2 text-left text-xs font-bold text-gray-700">{row.month}</td>
                        {row.cohorts.map((value, idx) => (
                          <td key={`${row.month}-${idx}`} className="p-0 text-center">
                            <div className={`mx-auto flex h-8 w-12 items-center justify-center rounded text-[0.65rem] font-medium ${retentionBgMap(value)}`}>
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                              {value}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500 justify-end border-t border-gray-100 pt-4">
                {retentionLegend.map((item) => (
<<<<<<< HEAD
                  <span key={item.label} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
                    <span className="h-2 w-6 rounded-full bg-indigo-500" />
=======
                  <span key={item.label} className="inline-flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-sm ${item.tone}`} />
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                    {item.label}
                  </span>
                ))}
              </div>
            </article>

<<<<<<< HEAD
            <article className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Action Center</p>
                  <p className="text-xs text-gray-500">Keep momentum high with these next steps</p>
                </div>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">3 open</span>
=======
            {/* Action Center */}
            <article className="flex flex-col gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Action Center</p>
                </div>
                <span className="rounded-full bg-[#2B2B2B] px-2 py-1 text-[0.6rem] font-bold text-white">3 PENDING</span>
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
              </div>

              <ul className="space-y-3 grow">
                {actionItems.map((item) => (
                  <li
                    key={item.title}
<<<<<<< HEAD
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium"
                  >
                    <p>{item.title}</p>
                    <div className="mt-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
=======
                    className={`rounded-lg px-4 py-4 shadow-sm border border-gray-100 ${item.tone} hover:shadow-md transition-shadow`}
                  >
                    <p className="text-sm font-semibold text-[#2B2B2B]">{item.title}</p>
                    <div className="mt-2 flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-wider text-gray-400">
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                      <span>{item.owner}</span>
                      <span>{item.due}</span>
                    </div>
                  </li>
                ))}
              </ul>

<<<<<<< HEAD
              <button className="mt-auto rounded-md border border-blue-600 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50">
                View full roadmap
=======
              <button className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-[#2B2B2B] hover:bg-gray-50 transition-colors">
                View Roadmap
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
              </button>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}