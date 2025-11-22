import {
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// --- Data & Configuration Updates ---

// Updated palette for charts (Monochrome Professional)
const CHART_COLORS = [
  "#2B2B2B", // Darkest (Primary)
  "#525252",
  "#737373",
  "#9CA3AF",
  "#B3B3B3", // Lightest (Secondary)
  "#D4D4D4",
];

const overviewStats = [
  {
    label: "Hired",
    value: "2",
    subtitle: "Offers accepted this month",
    change: "+1 vs July",
    changeColor: "text-emerald-600 bg-emerald-50", // Professional success indicator
    progress: 45,
    progressColor: "bg-[#2B2B2B]", // Primary Brand Color
    progressLabel: "45% of quarterly target",
  },
  {
    label: "Apps Per Hire",
    value: "2.1",
    subtitle: "Quality of applicant pipeline",
    change: "-0.4 vs benchmark",
    changeColor: "text-red-600 bg-red-50", // Professional alert indicator
    progress: 65,
    progressColor: "bg-[#B3B3B3]",
    progressLabel: "Pipeline health 65%",
  },
  {
    label: "Days to Hire",
    value: "5",
    subtitle: "Average time from application",
    change: "-2 days vs last month",
    changeColor: "text-emerald-600 bg-emerald-50",
    progress: 72,
    progressColor: "bg-[#2B2B2B]",
    progressLabel: "Service-level 72%",
  },
  {
    label: "Cost Per Hire",
    value: "₹1400",
    subtitle: "Recruiting spend per hire",
    change: "+₹120 vs budget",
    changeColor: "text-amber-600 bg-amber-50", // Warning
    progress: 58,
    progressColor: "bg-[#B3B3B3]",
    progressLabel: "Budget used 58%",
  },
  {
    label: "Open Positions",
    value: "5",
    subtitle: "Roles awaiting final interviews",
    change: "2 critical",
    changeColor: "text-[#2B2B2B] bg-gray-100",
    progress: 33,
    progressColor: "bg-[#2B2B2B]",
    progressLabel: "Critical roles 33%",
  },
  {
    label: "Days in Market",
    value: "6",
    subtitle: "Average posting visibility",
    change: "+1 day vs goal",
    changeColor: "text-[#2B2B2B] bg-gray-100",
    progress: 52,
    progressColor: "bg-[#B3B3B3]",
    progressLabel: "Exposure 52%",
  },
];

const monthlyMetrics = [
  {
    month: "May 2021",
    hired: "0",
    daysToHire: "-",
    status: "Planning",
    statusStyles: "bg-gray-100 text-gray-600",
  },
  {
    month: "June 2021",
    hired: "0",
    daysToHire: "-",
    status: "Sourcing",
    statusStyles: "bg-blue-50 text-blue-700",
  },
  {
    month: "July 2021",
    hired: "1",
    daysToHire: "6",
    status: "Filled",
    statusStyles: "bg-emerald-50 text-emerald-700",
  },
  {
    month: "August 2021",
    hired: "x",
    daysToHire: "x",
    status: "In progress",
    statusStyles: "bg-amber-50 text-amber-700",
  },
];

const funnelData = [
  { name: "Application", value: 100 },
  { name: "Phone Screen", value: 85 },
  { name: "MGR Interview", value: 75 },
  { name: "Onsite Interview", value: 65 },
  { name: "Offer", value: 55 },
  { name: "Hire", value: 45 },
];

const funnelInsights = [
  {
    stage: "Application → Phone Screen",
    drop: "15% drop",
    note: "Automated acknowledgement reduced wait time",
  },
  {
    stage: "Phone Screen → MGR Interview",
    drop: "10% drop",
    note: "Hiring manager capacity improving week-on-week",
  },
  {
    stage: "Onsite → Offer",
    drop: "10% drop",
    note: "Offer alignment workshop scheduled for next sprint",
  },
];

const pipelineData = [
  { name: "Application", value: 17, description: "Resume review within 24 hrs" },
  { name: "Phone Screen", value: 17, description: "Initial HR screening" },
  { name: "MGR Interview", value: 17, description: "Panel of hiring leads" },
  { name: "Onsite Interview", value: 17, description: "Clinical simulation" },
  { name: "Offer", value: 17, description: "Compensation negotiation" },
  { name: "Hire", value: 17, description: "Background & onboarding" },
];

const highlightCards = [
  {
    title: "Top Sourcing Channel",
    value: "Employee referrals",
    description: "Accounts for 55% of qualified applications with the lowest churn.",
    accent: "border-l-4 border-[#2B2B2B]", // Primary Dark
  },
  {
    title: "Urgent Role",
    value: "ICU Nurse (Night Shift)",
    description: "3 offers outstanding, final interviews scheduled this week.",
    accent: "border-l-4 border-red-500", // Urgent
  },
  {
    title: "Diversity Goal",
    value: "58% female hires",
    description: "On track to meet quarterly objective with current pipeline mix.",
    accent: "border-l-4 border-[#B3B3B3]", // Secondary
  },
];

export default function Dashboard() {
  return (
    // Page Background: Light Gray for contrast against white cards
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        
        {/* Main Container: Clean white background, professional shadow/border */}
        <div className="flex flex-col gap-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8 xl:p-12">
          
          {/* --- Header --- */}
          <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-md bg-[#F3F4F6] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#525252]">
                Overview
              </p>
              <h1 className="mt-4 text-2xl font-bold text-[#2B2B2B] sm:text-3xl">
                Hiring Dashboard & Funnel
              </h1>
            </div>
            <div className="self-start rounded-md bg-[#2B2B2B] px-4 py-2 text-sm font-semibold text-white shadow-md">
              August 2021
            </div>
          </header>

          {/* --- Stats Grid --- */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {overviewStats.map((stat) => (
              <article
                key={stat.label}
                // Card Style: White, light border, hover lift effect
                className="group flex flex-col justify-between rounded-lg border border-[#D4D4D4] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <header className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B3B3B3]">
                    {stat.label}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${stat.changeColor}`}
                  >
                    {stat.change}
                  </span>
                </header>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-[#2B2B2B] sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#525252]">
                    {stat.subtitle}
                  </p>
                </div>
                <div className="mt-5">
                  <div className="h-1.5 w-full rounded-full bg-[#F3F4F6]">
                    <div
                      className={`h-1.5 rounded-full ${stat.progressColor}`}
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-[#B3B3B3]">
                    {stat.progressLabel}
                  </p>
                </div>
              </article>
            ))}
          </section>

          {/* --- Main Content Split --- */}
          <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
            
            {/* 1. Monthly Metrics Table */}
            <div className="rounded-lg border border-[#D4D4D4] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-[#2B2B2B]">Monthly Metrics</h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-[#E5E7EB]">
                <table className="w-full text-left text-sm text-[#2B2B2B]">
                  <thead className="bg-[#F9FAFB] text-xs font-semibold uppercase tracking-wider text-[#737373]">
                    <tr>
                      <th className="px-4 py-3">Month</th>
                      <th className="px-4 py-3 text-center">Hired</th>
                      <th className="px-4 py-3 text-center">Days</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {monthlyMetrics.map((row) => (
                      <tr key={row.month} className="bg-white hover:bg-[#F9FAFB]">
                        <td className="px-4 py-3 font-medium">{row.month}</td>
                        <td className="px-4 py-3 text-center text-base font-semibold">
                          {row.hired}
                        </td>
                        <td className="px-4 py-3 text-center text-base font-semibold">
                          {row.daysToHire}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide ${row.statusStyles}`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Recruitment Funnel */}
            <div className="rounded-lg border border-[#D4D4D4] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-[#2B2B2B]">Recruitment Funnel</h2>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <FunnelChart>
                    <Tooltip
                      formatter={(value) => `${value}%`}
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#D4D4D4",
                        borderRadius: "6px",
                        color: "#2B2B2B",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      itemStyle={{ color: "#2B2B2B" }}
                    />
                    <Funnel
                      dataKey="value"
                      data={funnelData}
                      isAnimationActive={false}
                    >
                      {funnelData.map((entry, index) => (
                        <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                      <LabelList
                        position="right"
                        fill="#2B2B2B"
                        stroke="none"
                        dataKey="name"
                        className="text-xs font-semibold"
                      />
                      <LabelList
                        position="inside"
                        fill="#FFFFFF"
                        stroke="none"
                        dataKey="value"
                        formatter={(value) => `${value}%`}
                        className="text-xs font-bold"
                      />
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-4 space-y-3">
                {funnelInsights.map((item) => (
                  <li key={item.stage} className="rounded-md bg-[#F9FAFB] px-3 py-2 border border-[#E5E7EB]">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#737373]">
                      {item.stage}
                    </p>
                    <div className="mt-1 flex items-start justify-between text-xs">
                      <span className="font-bold text-red-600">{item.drop}</span>
                      <span className="text-[#525252] text-right max-w-[70%]">{item.note}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Pipeline Efficiency */}
            <div className="rounded-lg border border-[#D4D4D4] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-[#2B2B2B]">Pipeline Efficiency</h2>
              <p className="mt-1 text-xs font-medium text-[#737373]">
                Days taken per stage
              </p>
              <div className="mt-2 h-64">
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip
                       contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#D4D4D4",
                        borderRadius: "6px",
                        color: "#2B2B2B",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Pie
                      data={pipelineData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="90%"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    >
                      {pipelineData.map((entry, index) => (
                        <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-[#2B2B2B] text-xl font-bold"
                    >
                      Total
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                {pipelineData.map((stage, index) => (
                  <li
                    key={stage.name}
                    className="flex items-start gap-2 rounded-md p-2 hover:bg-[#F9FAFB]"
                  >
                    <span
                      className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    />
                    <div>
                      <p className="text-xs font-bold text-[#2B2B2B]">{stage.name}</p>
                      <p className="text-[10px] text-[#737373] leading-tight">
                        {stage.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* --- Highlight Cards --- */}
          <section className="grid gap-4 md:grid-cols-3">
            {highlightCards.map((card) => (
              <article
                key={card.title}
                className={`flex flex-col gap-2 rounded-lg bg-[#F9FAFB] px-5 py-4 shadow-sm ${card.accent}`}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#737373]">
                  {card.title}
                </span>
                <p className="text-lg font-bold text-[#2B2B2B]">{card.value}</p>
                <p className="text-xs text-[#525252]">{card.description}</p>
              </article>
            ))}
          </section>

          <p className="text-center text-xs text-[#B3B3B3]">
            Data synced from central payroll. Click charts to edit source.
          </p>
        </div>
      </main>
    </div>
  );
}