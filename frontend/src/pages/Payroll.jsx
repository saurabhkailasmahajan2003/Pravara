import React from 'react';
import { NavLink } from 'react-router-dom';

const payrollData = [
  {
    id: 'EMP-001',
    name: 'Dr. Kavita Kulkarni',
    monthlySalary: '₹2,50,000',
    annualPackage: '₹30,00,000',
  },
  {
    id: 'EMP-002',
    name: 'Rahul Deshmukh',
    monthlySalary: '₹95,000',
    annualPackage: '₹11,40,000',
  },
  {
    id: 'EMP-003',
    name: 'Nikita Jadhav',
    monthlySalary: '₹80,000',
    annualPackage: '₹9,60,000',
  },
  {
    id: 'EMP-004',
    name: 'Prakash Patil',
    monthlySalary: '₹60,000',
    annualPackage: '₹7,20,000',
  },
  {
    id: 'EMP-005',
    name: 'Sneha More',
    monthlySalary: '₹70,000',
    annualPackage: '₹8,40,000',
  },
  {
    id: 'EMP-006',
    name: 'Anil Gujar',
    monthlySalary: '₹55,000',
    annualPackage: '₹6,60,000',
  },
  {
    id: 'EMP-007',
    name: 'Dr. Manisha Pawar',
    monthlySalary: '₹1,80,000',
    annualPackage: '₹21,60,000',
  },
  {
    id: 'EMP-008',
    name: 'Sujata Kulkarni',
    monthlySalary: '₹65,000',
    annualPackage: '₹7,80,000',
  },
  {
    id: 'EMP-009',
    name: 'Vikram Shinde',
    monthlySalary: '₹75,000',
    annualPackage: '₹9,00,000',
  },
  {
    id: 'EMP-010',
    name: 'Meera Sathe',
    monthlySalary: '₹68,000',
    annualPackage: '₹8,16,000',
  },
]

const parseAmount = (value) => Number(value.replace(/[^0-9.]/g, ''))
const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

const totalMonthly = payrollData.reduce((sum, employee) => sum + parseAmount(employee.monthlySalary), 0)
const totalAnnual = payrollData.reduce((sum, employee) => sum + parseAmount(employee.annualPackage), 0)
const averageMonthly = Math.round(totalMonthly / payrollData.length)
const highestMonthly = payrollData.reduce(
  (max, employee) => Math.max(max, parseAmount(employee.monthlySalary)),
  0,
)

export default function Payroll() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 p-6">
        
        {/* --- Header Section --- */}
        <section className="rounded-xl border border-[#D4D4D4] bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-md bg-[#F3F4F6] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#525252] sm:text-xs">
                Payroll overview
              </span>
              <h1 className="mt-4 text-2xl font-bold text-[#2B2B2B] sm:text-3xl lg:text-4xl">
                Employee compensation summary
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[#525252]">
                Review monthly salary commitments, annual packages, and growth trends across Pravara Health Care. Use the insights below to plan payouts, manage incentives, and align budgets.
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <NavLink
                  to="/total-salaries"
                  className="inline-flex items-center gap-2 rounded-md bg-[#2B2B2B] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#525252]"
                >
                  View total salaries
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12l-3.75 3.75M21 12H3" />
                  </svg>
                </NavLink>
                <NavLink
                  to="/employees"
                  className="inline-flex items-center gap-2 rounded-md border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-semibold text-[#2B2B2B] shadow-sm transition hover:bg-[#F9FAFB]"
                >
                  Employee directory
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </NavLink>
              </div>
            </div>

            {/* Key Stats Box */}
            <div className="grid gap-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5">
              {[
                { label: 'Monthly payroll', value: formatCurrency(totalMonthly), detail: '+4.2% vs last cycle' },
                { label: 'Annualised payroll', value: formatCurrency(totalAnnual), detail: 'Including bonuses & perks' },
                { label: 'Highest monthly pay', value: formatCurrency(highestMonthly), detail: '₹1.8L at Oncology' },
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
            { label: 'Average monthly pay', value: formatCurrency(averageMonthly), accent: 'border-l-4 border-[#2B2B2B]' },
            { label: 'Median salary band', value: '₹72K', accent: 'border-l-4 border-[#737373]' },
            { label: 'Variable payout fund', value: '₹2.4L', accent: 'border-l-4 border-[#525252]' },
            { label: 'Payroll completion', value: '92%', accent: 'border-l-4 border-emerald-600' },
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

        {/* --- Payroll Table --- */}
        <section className="overflow-hidden rounded-xl border border-[#D4D4D4] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E5E7EB] text-left">
              <thead className="bg-[#F9FAFB]">
                <tr>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Employee</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Employee ID</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Monthly Salary</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#737373] sm:px-6 sm:py-4">Annual Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] bg-white">
                {payrollData.map((employee) => (
                  <tr key={employee.id} className="group transition hover:bg-[#F9FAFB]">
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <div className="flex items-center gap-3">
                        {/* Initials Avatar */}
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-xs font-bold text-[#2B2B2B] border border-[#E5E7EB] sm:h-10 sm:w-10 sm:text-sm group-hover:bg-[#E5E7EB] transition-colors">
                          {employee.name
                            .split(' ')
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join('')}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#2B2B2B] sm:text-base">{employee.name}</p>
                          <p className="text-[0.65rem] font-medium uppercase tracking-wider text-[#737373]">Payroll cycle</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-[#525252] sm:px-6 sm:py-4">{employee.id}</td>
                    <td className="px-4 py-3 text-sm font-bold text-[#2B2B2B] sm:px-6 sm:py-4">{employee.monthlySalary}</td>
                    <td className="px-4 py-3 text-sm font-medium text-[#525252] sm:px-6 sm:py-4">{employee.annualPackage}</td>
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