import { NavLink } from 'react-router-dom'
import { useState } from 'react'; // Added to make it a proper React functional component, though not strictly needed here

// --- Placeholder for Navbar (Since it was imported) ---
function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-[#2B2B2B]">PH CRM</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/" className="text-sm font-medium text-[#525252] hover:text-[#2B2B2B] py-2">Dashboard</NavLink>
              <NavLink to="/total-salaries" className="text-sm font-medium text-[#2B2B2B] border-b-2 border-[#2B2B2B] py-2">Salaries</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// --- Placeholder for Footer (Uses dark mode for contrast) ---
function Footer() {
  const BG_MAIN = "bg-[#0A0A0A]"; // Deep black background
  const BG_ACCENT = "bg-[#171717]"; // Dark gray for secondary background (bottom bar, contact box)
  const TEXT_PRIMARY = "text-white";
  const TEXT_MUTED = "text-[#A3A3A3]"; // Light gray for secondary text
  const BORDER_DARK = "border-[#262626]"; // Dark gray for borders

  return (
    <footer className={`mt-auto border-t ${BORDER_DARK} ${BG_MAIN} ${TEXT_MUTED}`}>
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-12 sm:gap-12 sm:px-6 lg:grid-cols-4 xl:px-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2B2B2B] text-white shadow-md">
              <span className="text-base font-bold">PH</span>
            </div>
            <div>
              <p className={`text-sm font-bold ${TEXT_PRIMARY}`}>Pravara Health Care</p>
              <p className={`text-[0.65rem] font-bold uppercase tracking-wider ${TEXT_MUTED}`}>Employee CRM</p>
            </div>
          </div>
          <p className={`max-w-xs text-sm ${TEXT_MUTED}`}>
            Empowering Pravara Health Care teams with real-time employee intelligence, payroll transparency, and operational alignment.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${TEXT_PRIMARY}`}>Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {['Dashboard', 'Employees', 'Payroll'].map((label) => (
              <li key={label}>
                <a href="#" className={`${TEXT_MUTED} hover:${TEXT_PRIMARY} hover:underline`}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${TEXT_PRIMARY}`}>Policies</h3>
          <ul className="space-y-2 text-sm">
            {['Privacy', 'Terms', 'Data'].map((label) => (
              <li key={label}>
                <a href="#" className={`${TEXT_MUTED} hover:${TEXT_PRIMARY} hover:underline`}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${TEXT_PRIMARY}`}>Contact</h3>
          <div className={`rounded-lg border ${BORDER_DARK} ${BG_ACCENT} p-3`}>
            <a href="mailto:support@phc.in" className={`text-sm font-bold ${TEXT_PRIMARY} hover:underline`}>support@phc.in</a>
            <p className={`text-xs ${TEXT_MUTED}`}>+91 1800-123-4521</p>
          </div>
        </div>
      </div>
      <div className={`border-t ${BORDER_DARK} ${BG_ACCENT}`}>
        <div className={`mx-auto flex max-w-screen-2xl flex-col items-center gap-3 px-4 py-4 text-xs ${TEXT_MUTED} sm:flex-row sm:justify-between sm:px-6 xl:px-16`}>
          <p>© {new Date().getFullYear()} Pravara Health Care.</p>
        </div>
      </div>
    </footer>
  )
}

// --- TotalSalaries Component ---

const totalSalaryData = [
  {
    id: 'EMP-001',
    name: 'Dr. Kavita Kulkarni',
    monthlySalary: '₹2,50,000',
    mobileRecharge: '₹999',
    fuelExpense: '₹12,500 · MH12 AB 1023',
    monthlyIncentive: '₹35,000',
    giftVoucher: '₹5,000',
  },
  {
    id: 'EMP-002',
    name: 'Rahul Deshmukh',
    monthlySalary: '₹95,000',
    mobileRecharge: '₹599',
    fuelExpense: '₹7,200 · MH15 CD 7744',
    monthlyIncentive: '₹8,500',
    giftVoucher: '₹2,000',
  },
  {
    id: 'EMP-003',
    name: 'Nikita Jadhav',
    monthlySalary: '₹80,000',
    mobileRecharge: '₹749',
    fuelExpense: '₹3,600 · Company Shuttle',
    monthlyIncentive: '₹6,500',
    giftVoucher: '₹1,500',
  },
  {
    id: 'EMP-004',
    name: 'Prakash Patil',
    monthlySalary: '₹60,000',
    mobileRecharge: '₹499',
    fuelExpense: '₹5,800 · MH14 EF 9087',
    monthlyIncentive: '₹4,200',
    giftVoucher: '₹1,000',
  },
  {
    id: 'EMP-005',
    name: 'Sneha More',
    monthlySalary: '₹70,000',
    mobileRecharge: '₹599',
    fuelExpense: '₹2,100 · Hospital Transit',
    monthlyIncentive: '₹5,500',
    giftVoucher: '₹1,200',
  },
  {
    id: 'EMP-006',
    name: 'Anil Gujar',
    monthlySalary: '₹55,000',
    mobileRecharge: '₹449',
    fuelExpense: '₹6,050 · MH12 GH 6655',
    monthlyIncentive: '₹3,800',
    giftVoucher: '₹900',
  },
  {
    id: 'EMP-007',
    name: 'Dr. Manisha Pawar',
    monthlySalary: '₹1,80,000',
    mobileRecharge: '₹1,199',
    fuelExpense: '₹11,300 · MH15 JK 2201',
    monthlyIncentive: '₹22,000',
    giftVoucher: '₹4,500',
  },
  {
    id: 'EMP-008',
    name: 'Sujata Kulkarni',
    monthlySalary: '₹65,000',
    mobileRecharge: '₹549',
    fuelExpense: '₹4,850 · MH12 LM 7788',
    monthlyIncentive: '₹4,900',
    giftVoucher: '₹1,300',
  },
  {
    id: 'EMP-009',
    name: 'Vikram Shinde',
    monthlySalary: '₹75,000',
    mobileRecharge: '₹699',
    fuelExpense: '₹6,900 · MH14 NP 5511',
    monthlyIncentive: '₹5,700',
    giftVoucher: '₹1,700',
  },
  {
    id: 'EMP-010',
    name: 'Meera Sathe',
    monthlySalary: '₹68,000',
    mobileRecharge: '₹649',
    fuelExpense: '₹3,200 · Corporate Shuttle',
    monthlyIncentive: '₹5,100',
    expectedGiftVoucher: '₹1,400',
    giftVoucher: '₹1,400',
  },
]

// Helper functions for calculation and formatting
const parseCurrency = (value) => Number(value.replace(/[^0-9.]/g, ''))
const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

const totalMonthlySalary = totalSalaryData.reduce((sum, employee) => sum + parseCurrency(employee.monthlySalary), 0)
const totalRecharge = totalSalaryData.reduce((sum, employee) => sum + parseCurrency(employee.mobileRecharge), 0)
const totalIncentives = totalSalaryData.reduce((sum, employee) => sum + parseCurrency(employee.monthlyIncentive), 0)
const totalVouchers = totalSalaryData.reduce((sum, employee) => sum + parseCurrency(employee.giftVoucher), 0)
const totalFuel = totalSalaryData.reduce((sum, employee) => sum + parseCurrency(employee.fuelExpense.split('·')[0]), 0)


export default function TotalSalaries() {
  // Constants for consistent styling
  const BG_PAGE = "bg-[#F9FAFB]";
  const BG_CARD = "bg-white";
  const BORDER_LIGHT = "border-[#E5E7EB]";
  const TEXT_DARK = "text-[#2B2B2B]";
  const TEXT_MUTED = "text-[#525252]";
  const TEXT_LABEL = "text-[#737373]";
  const BUTTON_PRIMARY = "bg-[#2B2B2B] text-white shadow-sm transition hover:bg-[#525252]";
  const BUTTON_SECONDARY = "border border-[#D4D4D4] bg-white text-[#2B2B2B] shadow-sm transition hover:bg-[#F9FAFB]";

  return (
    <div className={`flex min-h-screen flex-col ${BG_PAGE}`}>
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl grow flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10">
        
        {/* --- Header Section --- */}
        <section className={`rounded-xl border ${BORDER_LIGHT} ${BG_CARD} px-5 py-8 shadow-md sm:px-8 sm:py-10`}>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-start">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-md bg-[#F3F4F6] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider ${TEXT_MUTED} sm:text-xs`}>
                Total salaries
              </span>
              <h1 className={`mt-4 text-2xl font-bold ${TEXT_DARK} sm:text-3xl lg:text-4xl`}>
                Comprehensive compensation breakdown
              </h1>
              <p className={`mt-3 max-w-2xl text-sm ${TEXT_MUTED}`}>
                Audit every salary component including allowances, benefits, vehicle reimbursements, and vouchers. Keep transparency high and approvals swift for Pravara Health Care leadership.
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <NavLink
                  to="/payroll"
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ${BUTTON_PRIMARY}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 8.25 3 12l3.75 3.75M3 12h18" />
                  </svg>
                  Back to payroll
                </NavLink>
                <button className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ${BUTTON_SECONDARY}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12M12 3.75v12m0 0 3.75-3.75M12 15.75 8.25 12" />
                  </svg>
                  Export summary
                </button>
              </div>
            </div>

            {/* Key Stats Box */}
            <div className={`grid gap-3 rounded-lg border ${BORDER_LIGHT} bg-[#F0F2F5] p-4 sm:p-5`}>
              {[
                { label: 'Monthly salary payout', value: formatCurrency(totalMonthlySalary), detail: '+5.1% QoQ' },
                { label: 'Monthly allowances', value: formatCurrency(totalRecharge + totalIncentives + totalVouchers + totalFuel), detail: 'All reimbursements combined' },
                { label: 'Fuel reimbursements', value: formatCurrency(totalFuel), detail: 'With vehicle tracking' },
              ].map((stat) => (
                <div key={stat.label} className={`rounded-md ${BG_CARD} p-3 shadow-sm border ${BORDER_LIGHT} sm:p-4`}>
                  <p className={`text-[0.6rem] font-bold uppercase tracking-wider ${TEXT_LABEL} sm:text-xs`}>
                    {stat.label}
                  </p>
                  <p className={`mt-1 text-xl font-bold ${TEXT_DARK} sm:text-2xl`}>
                    {stat.value}
                  </p>
                  <p className={`mt-1 text-[0.7rem] font-medium ${TEXT_MUTED} sm:text-xs`}>
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
            { label: 'Recharge support', value: formatCurrency(totalRecharge), accent: 'border-[#2B2B2B]' },
            { label: 'Monthly incentives', value: formatCurrency(totalIncentives), accent: 'border-[#525252]' },
            { label: 'Gift vouchers', value: formatCurrency(totalVouchers), accent: 'border-[#737373]' },
            { label: 'Employees covered', value: `${totalSalaryData.length} team members`, accent: 'border-[#3B82F6]' },
          ].map((item) => (
            <div key={item.label} className={`rounded-lg border ${BORDER_LIGHT} ${BG_CARD} p-4 shadow-sm border-l-4 ${item.accent}`}>
              <p className={`text-[0.65rem] font-bold uppercase tracking-wider ${TEXT_LABEL} sm:text-xs`}>
                {item.label}
              </p>
              <p className={`mt-2 text-lg font-bold ${TEXT_DARK} sm:text-xl`}>
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* --- Detailed Table --- */}
        <section className={`overflow-hidden rounded-xl border ${BORDER_LIGHT} ${BG_CARD} shadow-md`}>
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${BORDER_LIGHT} text-left`}>
              <thead className="bg-[#F9FAFB]">
                <tr>
                  <th scope="col" className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${TEXT_LABEL} sm:px-6 sm:py-4`}>Employee</th>
                  <th scope="col" className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${TEXT_LABEL} sm:px-6 sm:py-4`}>Employee ID</th>
                  <th scope="col" className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${TEXT_LABEL} sm:px-6 sm:py-4`}>Monthly Salary</th>
                  <th scope="col" className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${TEXT_LABEL} sm:px-6 sm:py-4`}>Mobile Recharge</th>
                  <th scope="col" className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${TEXT_LABEL} sm:px-6 sm:py-4`}>Fuel & Vehicle</th>
                  <th scope="col" className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${TEXT_LABEL} sm:px-6 sm:py-4`}>Incentive</th>
                  <th scope="col" className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${TEXT_LABEL} sm:px-6 sm:py-4`}>Vouchers</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${BORDER_LIGHT} ${BG_CARD}`}>
                {totalSalaryData.map((employee) => (
                  <tr key={employee.id} className="group transition hover:bg-[#F9FAFB]">
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <div className="flex items-center gap-3">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] border ${BORDER_LIGHT} text-xs font-bold ${TEXT_DARK} sm:h-10 sm:w-10 sm:text-sm group-hover:bg-[#E5E7EB] transition-colors`}>
                          {employee.name
                            .split(' ')
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join('')}
                        </span>
                        <div>
                          <p className={`text-sm font-semibold ${TEXT_DARK} sm:text-base`}>{employee.name}</p>
                          <p className={`text-[0.65rem] font-medium uppercase tracking-wider ${TEXT_LABEL}`}>{employee.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${TEXT_MUTED} sm:px-6 sm:py-4`}>{employee.id}</td>
                    <td className={`px-4 py-3 text-sm font-bold ${TEXT_DARK} sm:px-6 sm:py-4`}>{employee.monthlySalary}</td>
                    <td className={`px-4 py-3 text-sm font-medium ${TEXT_MUTED} sm:px-6 sm:py-4`}>{employee.mobileRecharge}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <div className="flex flex-col">
                        <span className={`text-sm font-semibold ${TEXT_DARK}`}>{employee.fuelExpense.split('·')[0].trim()}</span>
                        <span className={`text-[0.65rem] font-medium uppercase tracking-wider ${TEXT_LABEL}`}>
                          {employee.fuelExpense.split('·')[1]?.trim() ?? '—'}
                        </span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${TEXT_MUTED} sm:px-6 sm:py-4`}>{employee.monthlyIncentive}</td>
                    <td className={`px-4 py-3 text-sm font-medium ${TEXT_MUTED} sm:px-6 sm:py-4`}>{employee.giftVoucher}</td>
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