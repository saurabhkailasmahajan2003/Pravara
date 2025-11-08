import { NavLink } from "react-router-dom";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const salaryGrowth = [
  { month: "Jan", increment: 2.5, totalSalary: 8.8 },
  { month: "Feb", increment: 3.1, totalSalary: 9.2 },
  { month: "Mar", increment: 2.2, totalSalary: 9.6 },
  { month: "Apr", increment: 4.3, totalSalary: 10.4 },
  { month: "May", increment: 3.7, totalSalary: 10.8 },
  { month: "Jun", increment: 5.1, totalSalary: 11.4 },
];

const expenseComparison = [
  { month: "Jan", payroll: 8.8, operations: 2.4, lastMonth: 9.6 },
  { month: "Feb", payroll: 9.2, operations: 2.5, lastMonth: 9.9 },
  { month: "Mar", payroll: 9.6, operations: 2.3, lastMonth: 10.1 },
  { month: "Apr", payroll: 10.4, operations: 2.8, lastMonth: 10.9 },
  { month: "May", payroll: 10.8, operations: 2.7, lastMonth: 11.2 },
  { month: "Jun", payroll: 11.4, operations: 2.9, lastMonth: 11.8 },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl grow flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-5 py-8 text-white shadow-2xl shadow-slate-900/20 sm:px-8 sm:py-10">
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-sky-500/40 blur-3xl sm:h-64 sm:w-64" />
          <div className="absolute bottom-0 left-[15%] h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl sm:h-40 sm:w-40" />
          <div className="relative flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sky-200 sm:text-xs">
                Welcome back
              </span>
              <h1 className="mt-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
                Pravara Health Care Employee Intelligence Hub
              </h1>
              <p className="mt-3 text-xs text-slate-200 sm:mt-4 sm:text-sm">
                Monitor talent productivity, payroll commitments, and operational costs across every Pravara clinic. Activate live analytics, directories, and transparent expense reports to equip leadership with timely decisions.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
                <NavLink
                  to="/employees"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm shadow-slate-700/30 transition hover:bg-slate-100 sm:px-4 sm:text-sm"
                >
                  Manage employees
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12l-3.75 3.75M21 12H3" />
                  </svg>
                </NavLink>
                <NavLink
                  to="/payroll"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-3 py-2 text-xs font-semibold text-white transition hover:border-white hover:bg-white/10 sm:px-4 sm:text-sm"
                >
                  View payroll
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </NavLink>
              </div>
            </div>
            <div className="grid w-full max-w-sm grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur sm:gap-4 sm:p-5 lg:max-w-xs">
              {[{ label: "Average increment", value: "+3.5%", detail: "vs previous month" }, { label: "Payroll cycle", value: "₹11.4L", detail: "Current month outlay" }, { label: "Operational spend", value: "₹2.9L", detail: "Facilities & logistics" }].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/10 p-3 sm:p-4">
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-slate-200/80 sm:text-xs">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">{item.value}</p>
                  <p className="mt-1 text-[0.65rem] font-medium text-slate-200 sm:text-xs">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {[{
            title: "Active Employees",
            value: "10",
            change: "+5.3%",
            changeTone: "text-emerald-500",
            to: "/employees",
            cta: "View employees",
          }, {
            title: "Total Salaries (10 employees)",
            value: "₹10,00,000",
            change: "Updated monthly",
            changeTone: "text-sky-500",
            to: "/total-salaries",
            cta: "View salaries",
          }, {
            title: "Other Expenses",
            value: "₹1,50,000",
            change: "Monthly total",
            changeTone: "text-amber-500",
            to: "/other-expenses",
            cta: "View expenses",
          }].map((card) =>
            card.to ? (
              <NavLink
                key={card.title}
                to={card.to}
                className="group block rounded-3xl border border-slate-200/70 bg-white/90 p-px shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              >
                <article className="rounded-[calc(var(--radius-3xl)-3px)] bg-linear-to-br from-white via-slate-50 to-slate-100 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-500">{card.title}</p>
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-400 transition group-hover:bg-sky-500" />
                  </div>
                  <p className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">{card.value}</p>
                  <p className={`mt-2 text-xs font-medium ${card.changeTone}`}>{card.change}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-sky-600 sm:mt-5 sm:text-xs">
                    {card.cta ?? "View details"}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 transition group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </article>
              </NavLink>
            ) : (
              <article
                key={card.title}
                className="group rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-500">{card.title}</p>
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-400 transition group-hover:bg-amber-500" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">{card.value}</p>
                <p className={`mt-2 text-xs font-medium ${card.changeTone}`}>{card.change}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-slate-500 sm:mt-5 sm:text-xs">
                  Snapshot updated
                </span>
              </article>
            ),
          )}
        </section>

        <section className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-xl shadow-slate-200/50 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Salary Increment Trend</h2>
                <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
                  Increment vs total outlay
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[0.65rem] font-semibold text-emerald-600 sm:text-xs">
                Last 6 months
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-600 sm:text-sm">
              Average increment percentage plotted against rolling salary commitments.
            </p>
            <div className="mt-5 h-60 sm:mt-6 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salaryGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis yAxisId="left" tickFormatter={(value) => `${value}%`} stroke="#0ea5e9" />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `₹${value.toFixed(1)}L`} stroke="#0f172a" />
                  <Tooltip
                    formatter={(value, name) => {
                      const numericValue =
                        typeof value === "number" ? value : Number.parseFloat(String(value));
                      if (Number.isNaN(numericValue)) {
                        return [value, name];
                      }
                      if (name === "Increment") {
                        return [`${numericValue.toFixed(1)}%`, name];
                      }
                      return [`₹${numericValue.toFixed(1)}L`, name];
                    }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="increment" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} name="Increment" />
                  <Line yAxisId="right" type="monotone" dataKey="totalSalary" stroke="#0f172a" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} name="Total Salary (L)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-xl shadow-slate-200/50 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Expense Comparison</h2>
                <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
                  Payroll & operations vs last month
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/10 px-3 py-1 text-[0.65rem] font-semibold text-slate-800 sm:text-xs">
                Updated weekly
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-600 sm:text-sm">
              Compare current month allocations versus previous month totals across all facilities.
            </p>
            <div className="mt-5 h-60 sm:mt-6 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={expenseComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis tickFormatter={(value) => `₹${value.toFixed(1)}L`} stroke="#0f172a" />
                  <Tooltip formatter={(value) => (typeof value === "number" ? `₹${value.toFixed(1)}L` : value)} />
                  <Legend />
                  <Bar dataKey="payroll" fill="#0ea5e9" radius={[10, 10, 0, 0]} name="Payroll (L)" />
                  <Bar dataKey="operations" fill="#1e293b" radius={[10, 10, 0, 0]} name="Operations (L)" />
                  <Line type="monotone" dataKey="lastMonth" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} name="Previous Month (L)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-xl shadow-slate-200/50 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Team Priorities</h2>
                <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
                  Coordination & follow-ups
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-[0.65rem] font-semibold text-slate-500 transition hover:border-sky-200 hover:text-sky-600 sm:text-xs">
                View planner
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
                </svg>
              </button>
            </div>
            <ul className="mt-5 space-y-3 sm:mt-6">
              {[
                {
                  title: "Conduct onboarding stand-up for new nursing hires",
                  owner: "People Ops",
                  tag: "Today, 11:30 AM",
                  accent: "bg-sky-500",
                },
                {
                  title: "Review oncology resident shift adjustments",
                  owner: "Dr. Kulkarni",
                  tag: "Upcoming",
                  accent: "bg-emerald-500",
                },
                {
                  title: "Compile incentives report for finance approval",
                  owner: "Payroll Team",
                  tag: "Due Friday",
                  accent: "bg-amber-500",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/80 px-3.5 py-3 transition hover:border-sky-200 hover:bg-sky-50/60 sm:px-4"
                >
                  <span className={`mt-1 h-2 w-2 rounded-full ${item.accent} sm:h-2.5 sm:w-2.5`} />
                  <div>
                    <p className="text-sm font-medium text-slate-700">{item.title}</p>
                    <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                      {item.owner}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-[0.6rem] font-medium text-slate-500 sm:text-[0.65rem]">
                      {item.tag}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-xl shadow-slate-200/50 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Financial Health</h2>
                <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
                  Key payroll indicators
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-[0.65rem] font-semibold text-slate-500 transition hover:border-sky-200 hover:text-sky-600 sm:text-xs">
                Export summary
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12M12 3.75v12m0 0 3.75-3.75M12 15.75 8.25 12" />
                </svg>
              </button>
            </div>
            <dl className="mt-6 grid gap-3 text-xs text-slate-600 sm:grid-cols-2 sm:gap-4 sm:text-sm">
              {[
                { label: "Outstanding invoices", value: "₹3.8L", trend: "-8% vs last month" },
                { label: "Average payment time", value: "6.2 days", trend: "Stable" },
                { label: "Insurance approvals", value: "92%", trend: "+3% week-over-week" },
                { label: "Employee incentives", value: "₹1.2L", trend: "+12% cycle" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200/70 bg-white/80 p-3 sm:p-4">
                  <dt className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">
                    {item.value}
                  </dd>
                  <p className="mt-1 text-[0.65rem] font-medium text-emerald-500 sm:text-xs">
                    {item.trend}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
