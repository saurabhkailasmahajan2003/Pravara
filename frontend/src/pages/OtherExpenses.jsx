import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { NavLink } from 'react-router-dom'

const expenseData = [
  {
    month: 'January 2025',
    officeRent: '₹2,20,000',
    utilities: '₹68,500',
    other: '₹45,200',
    notes: 'Onboarding event, facility maintenance',
  },
  {
    month: 'February 2025',
    officeRent: '₹2,20,000',
    utilities: '₹62,400',
    other: '₹38,900',
    notes: 'CRM vendor workshops, cafeteria upgrade',
  },
  {
    month: 'March 2025',
    officeRent: '₹2,20,000',
    utilities: '₹71,350',
    other: '₹52,800',
    notes: 'Quarterly compliance audits',
  },
  {
    month: 'April 2025',
    officeRent: '₹2,20,000',
    utilities: '₹65,900',
    other: '₹41,600',
    notes: 'Wellness program launch',
  },
  {
    month: 'May 2025',
    officeRent: '₹2,20,000',
    utilities: '₹67,100',
    other: '₹36,750',
    notes: 'IT infrastructure refresh',
  },
  {
    month: 'June 2025',
    officeRent: '₹2,20,000',
    utilities: '₹69,400',
    other: '₹48,300',
    notes: 'Staff training initiatives',
  },
]

const parseAmount = (value) => Number(value.replace(/[^0-9.]/g, ''))
const totalOfficeRent = expenseData.reduce((sum, item) => sum + parseAmount(item.officeRent), 0)
const totalUtilities = expenseData.reduce((sum, item) => sum + parseAmount(item.utilities), 0)
const totalOther = expenseData.reduce((sum, item) => sum + parseAmount(item.other), 0)
const totalExpenses = totalOfficeRent + totalUtilities + totalOther

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

export default function OtherExpenses() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl grow flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-600 via-orange-500 to-rose-600 px-5 py-8 text-white shadow-2xl shadow-orange-900/30 sm:px-8 sm:py-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 rounded-bl-[6rem] bg-white/10 blur-3xl sm:block" />
          <div className="relative grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-orange-100 sm:text-xs">
                Monthly expenses
              </span>
              <h1 className="mt-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
                Other operational expenditure overview
              </h1>
              <p className="mt-3 max-w-2xl text-xs text-orange-100/80 sm:mt-4 sm:text-sm">
                Track recurring office rent commitments, utility consumption, and discretionary spend across Pravara
                Health Care facilities. Use this overview to anticipate upcoming payouts and optimize cost efficiency.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
                <NavLink
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm shadow-slate-700/30 transition hover:bg-slate-100 sm:px-4 sm:text-sm"
                >
                  Back to dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 8.25 3 12l3.75 3.75M3 12h18" />
                  </svg>
                </NavLink>
                <NavLink
                  to="/payroll"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-3 py-2 text-xs font-semibold text-white transition hover:border-white hover:bg-white/10 sm:px-4 sm:text-sm"
                >
                  Payroll overview
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12l-3.75 3.75M21 12H3" />
                  </svg>
                </NavLink>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:gap-4 sm:p-5">
              {[{ label: 'Total tracked months', value: `${expenseData.length}`, detail: 'Rolling financial view' }, { label: 'Current quarter spend', value: formatCurrency(totalExpenses), detail: 'Rent + utilities + misc' }, { label: 'Utilities variance', value: '+6.8%', detail: 'Compared to previous quarter' }].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/10 p-3 sm:p-4">
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-orange-100/70 sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[0.65rem] font-medium text-orange-100/70 sm:text-xs">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-4 sm:gap-4">
          {[{ label: 'Total rent (6 months)', value: formatCurrency(totalOfficeRent), tone: 'bg-amber-500/10 text-amber-600' }, { label: 'Total utilities', value: formatCurrency(totalUtilities), tone: 'bg-rose-500/10 text-rose-600' }, { label: 'Other overheads', value: formatCurrency(totalOther), tone: 'bg-indigo-500/10 text-indigo-600' }, { label: 'Average monthly spend', value: formatCurrency(Math.round(totalExpenses / expenseData.length)), tone: 'bg-teal-500/10 text-teal-600' }].map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200/70 bg-white/95 p-4 shadow-lg shadow-slate-200/40 sm:p-5">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-slate-400 sm:text-xs">{item.label}</p>
              <p className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${item.tone} sm:text-sm`}>{item.value}</p>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 shadow-xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200/70 text-left">
              <thead className="bg-slate-50 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-500 sm:text-xs">
                <tr>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Month</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Office Rent</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Light & Utility</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Other Expenses</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-600 sm:text-sm">
                {expenseData.map((month) => (
                  <tr key={month.month} className="transition hover:bg-amber-50/60">
                    <td className="px-4 py-3 font-semibold text-slate-900 sm:px-6 sm:py-4">{month.month}</td>
                    <td className="px-4 py-3 text-slate-900 sm:px-6 sm:py-4">{month.officeRent}</td>
                    <td className="px-4 py-3 text-slate-900 sm:px-6 sm:py-4">{month.utilities}</td>
                    <td className="px-4 py-3 text-slate-900 sm:px-6 sm:py-4">{month.other}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-semibold text-slate-500 sm:text-xs">
                        {month.notes}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

