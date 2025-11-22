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
    // Page Background: Light Gray
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">


      <main className="mx-auto flex w-full max-w-7xl grow flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10">
        
        {/* --- Header Section --- */}
        <section className="rounded-xl border border-[#D4D4D4] bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-md bg-[#F3F4F6] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#525252] sm:text-xs">
                Monthly expenses
              </span>
              <h1 className="mt-4 text-2xl font-bold text-[#2B2B2B] sm:text-3xl lg:text-4xl">
                Operational expenditure overview
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[#525252]">
                Track recurring office rent commitments, utility consumption, and discretionary spend across Pravara Health Care facilities. Use this overview to anticipate upcoming payouts and optimize cost efficiency.
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <NavLink
                  to="/"
                  className="inline-flex items-center gap-2 rounded-md bg-[#2B2B2B] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#525252]"
                >
                  Back to dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 8.25 3 12l3.75 3.75M3 12h18" />
                  </svg>
                </NavLink>
                <NavLink
                  to="/payroll"
                  className="inline-flex items-center gap-2 rounded-md border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-semibold text-[#2B2B2B] shadow-sm transition hover:bg-[#F9FAFB]"
                >
                  Payroll overview
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12l-3.75 3.75M21 12H3" />
                  </svg>
                </NavLink>
              </div>
            </div>

            {/* Key Stats Box */}
            <div className="grid gap-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5">
              {[
                { label: 'Total tracked months', value: `${expenseData.length}`, detail: 'Rolling financial view' },
                { label: 'Current quarter spend', value: formatCurrency(totalExpenses), detail: 'Rent + utilities + misc' },
                { label: 'Utilities variance', value: '+6.8%', detail: 'Compared to previous quarter' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-md bg-white p-3 shadow-sm border border-[#E5E7EB] sm:p-4">
                  <p className="text-[0.6rem] font-bold uppercase tracking-wider text-[#737373] sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xl font-bold text-[#2B2B2B] sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.7rem] font-medium text-[#525252] sm:text-xs">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Quick Stats Grid --- */}
        <section className="grid gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { label: 'Total rent (6 months)', value: formatCurrency(totalOfficeRent), accent: 'border-l-4 border-[#2B2B2B]' },
            { label: 'Total utilities', value: formatCurrency(totalUtilities), accent: 'border-l-4 border-[#525252]' },
            { label: 'Other overheads', value: formatCurrency(totalOther), accent: 'border-l-4 border-[#737373]' },
            { label: 'Avg monthly spend', value: formatCurrency(Math.round(totalExpenses / expenseData.length)), accent: 'border-l-4 border-[#9CA3AF]' },
          ].map((item) => (
            <div key={item.label} className={`rounded-lg border border-[#D4D4D4] bg-white p-4 shadow-sm ${item.accent}`}>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#737373] sm:text-xs">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-bold text-[#2B2B2B] sm:text-xl">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* --- Expense Table --- */}
        <section className="overflow-hidden rounded-xl border border-[#D4D4D4] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E5E7EB] text-left">
              <thead className="bg-[#F9FAFB]">
                <tr>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Month</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Office Rent</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Utilities</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Other Expenses</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] bg-white">
                {expenseData.map((month) => (
                  <tr key={month.month} className="group transition hover:bg-[#F9FAFB]">
                    <td className="px-4 py-3 text-sm font-semibold text-[#2B2B2B] sm:px-6 sm:py-4">{month.month}</td>
                    <td className="px-4 py-3 text-sm text-[#525252] sm:px-6 sm:py-4">{month.officeRent}</td>
                    <td className="px-4 py-3 text-sm text-[#525252] sm:px-6 sm:py-4">{month.utilities}</td>
                    <td className="px-4 py-3 text-sm text-[#525252] sm:px-6 sm:py-4">{month.other}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span className="inline-flex rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-[0.65rem] font-bold text-[#525252] sm:text-xs">
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
    </div>
  )
}