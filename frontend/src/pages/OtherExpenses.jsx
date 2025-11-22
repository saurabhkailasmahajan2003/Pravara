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
    <div className="flex min-h-screen flex-col bg-[#000000]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl grow flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-neon-gradient px-5 py-8 text-white shadow-2xl neon-glow-gradient sm:px-8 sm:py-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 rounded-bl-[6rem] bg-white/10 blur-3xl sm:block" />
          <div className="relative grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white sm:text-xs">
                Monthly expenses
              </span>
              <h1 className="mt-4 text-2xl font-bold text-[#2B2B2B] sm:text-3xl lg:text-4xl">
                Operational expenditure overview
              </h1>
              <p className="mt-3 max-w-2xl text-xs text-orange-100/80 sm:mt-4 sm:text-sm">
                Track recurring office rent commitments, utility consumption, and discretionary spend across Pravara
                Health Care facilities. Use this overview to anticipate upcoming payouts and optimize cost efficiency.
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <NavLink
                  to="/dashboard"
                  className="btn-neon-primary inline-flex items-center gap-2 text-xs sm:px-4 sm:text-sm"
                >
                  Back to dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 8.25 3 12l3.75 3.75M3 12h18" />
                  </svg>
                </NavLink>
                <NavLink
                  to="/payroll"
                  className="btn-neon-outline inline-flex items-center gap-2 text-xs sm:px-4 sm:text-sm"
                >
                  Payroll overview
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12l-3.75 3.75M21 12H3" />
                  </svg>
                </NavLink>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl glass-card p-4 sm:gap-4 sm:p-5">
              {[{ label: 'Total tracked months', value: `${expenseData.length}`, detail: 'Rolling financial view' }, { label: 'Current quarter spend', value: formatCurrency(totalExpenses), detail: 'Rent + utilities + misc' }, { label: 'Utilities variance', value: '+6.8%', detail: 'Compared to previous quarter' }].map((stat) => (
                <div key={stat.label} className="rounded-xl glass p-3 sm:p-4">
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-white/80 sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[0.65rem] font-medium text-white/70 sm:text-xs">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Quick Stats Grid --- */}
        <section className="grid gap-3 sm:grid-cols-4 sm:gap-4">
          {[{ label: 'Total rent (6 months)', value: formatCurrency(totalOfficeRent), tone: 'bg-[#A020F0]/20 text-[#A020F0]' }, { label: 'Total utilities', value: formatCurrency(totalUtilities), tone: 'bg-[#FF00CC]/20 text-[#FF00CC]' }, { label: 'Other overheads', value: formatCurrency(totalOther), tone: 'bg-[#D400FF]/20 text-[#D400FF]' }, { label: 'Average monthly spend', value: formatCurrency(Math.round(totalExpenses / expenseData.length)), tone: 'bg-[#A020F0]/20 text-[#A020F0]' }].map((item) => (
            <div key={item.label} className="card-neon p-4 sm:p-5">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-[#A0A0A0] sm:text-xs">{item.label}</p>
              <p className={`mt-3 inline-flex items-center rounded-full glass px-3 py-1 text-xs font-semibold ${item.tone} sm:text-sm`}>{item.value}</p>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl card-neon">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left">
              <thead className="glass text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#A0A0A0] sm:text-xs">
                <tr>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Month</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Office Rent</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Utilities</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Other Expenses</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs text-white sm:text-sm">
                {expenseData.map((month) => (
                  <tr key={month.month} className="transition hover:bg-neon-gradient-blur">
                    <td className="px-4 py-3 font-semibold text-white sm:px-6 sm:py-4">{month.month}</td>
                    <td className="px-4 py-3 text-white sm:px-6 sm:py-4">{month.officeRent}</td>
                    <td className="px-4 py-3 text-white sm:px-6 sm:py-4">{month.utilities}</td>
                    <td className="px-4 py-3 text-white sm:px-6 sm:py-4">{month.other}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span className="inline-flex rounded-full glass px-3 py-1 text-[0.65rem] font-semibold text-white sm:text-xs">
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