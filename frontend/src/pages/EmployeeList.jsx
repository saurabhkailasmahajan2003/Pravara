import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { NavLink } from 'react-router-dom'

const employees = [
  {
    id: 'EMP-001',
    name: 'Dr. Kavita Kulkarni',
    designation: 'Chief Medical Officer',
    clinic: 'Central Clinic',
  },
  {
    id: 'EMP-002',
    name: 'Rahul Deshmukh',
    designation: 'Senior Nurse',
    clinic: 'Pediatrics Unit',
  },
  {
    id: 'EMP-003',
    name: 'Nikita Jadhav',
    designation: 'HR & Payroll Specialist',
    clinic: 'Corporate Office',
  },
  {
    id: 'EMP-004',
    name: 'Prakash Patil',
    designation: 'Lab Technician',
    clinic: 'Diagnostics Center',
  },
  {
    id: 'EMP-005',
    name: 'Sneha More',
    designation: 'Physiotherapist',
    clinic: 'Rehabilitation Clinic',
  },
  {
    id: 'EMP-006',
    name: 'Anil Gujar',
    designation: 'Front Desk Coordinator',
    clinic: 'Central Clinic',
  },
  {
    id: 'EMP-007',
    name: 'Dr. Manisha Pawar',
    designation: 'Dermatologist',
    clinic: 'Skin Care Clinic',
  },
  {
    id: 'EMP-008',
    name: 'Sujata Kulkarni',
    designation: 'Pharmacist',
    clinic: 'Pharmacy Unit',
  },
  {
    id: 'EMP-009',
    name: 'Vikram Shinde',
    designation: 'IT Support Specialist',
    clinic: 'Corporate Office',
  },
  {
    id: 'EMP-010',
    name: 'Meera Sathe',
    designation: 'Nutritionist',
    clinic: 'Wellness Center',
  },
]

const totalClinics = new Set(employees.map((employee) => employee.clinic)).size
const medicalStaffCount = employees.filter((employee) =>
  employee.designation.toLowerCase().includes('dr') || employee.designation.toLowerCase().includes('nurse'),
).length
const supportStaffCount = employees.length - medicalStaffCount

export default function EmployeeList() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl grow flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-sky-600 via-sky-500 to-indigo-600 px-5 py-8 text-white shadow-2xl shadow-sky-900/20 sm:px-8 sm:py-10">
          <div className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/10 blur-3xl sm:h-80 sm:w-80" />
          <div className="relative grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-sky-100 sm:text-xs">
                Employee directory
              </span>
              <h1 className="mt-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
                Pravara Health Care Staff Overview
              </h1>
              <p className="mt-3 max-w-2xl text-xs text-sky-100/80 sm:mt-4 sm:text-sm">
                Quickly review staffing coverage across clinics, identify specialist availability, and ensure operational excellence with a real-time view of all employees.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
                <NavLink
                  to="/payroll"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm shadow-slate-700/30 transition hover:bg-slate-100 sm:px-4 sm:text-sm"
                >
                  Sync with payroll
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </NavLink>
                <NavLink
                  to="/total-salaries"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-3 py-2 text-xs font-semibold text-white transition hover:border-white hover:bg-white/10 sm:px-4 sm:text-sm"
                >
                  View allowances
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
                  </svg>
                </NavLink>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:gap-4 sm:p-5">
              {[{ label: 'Total employees', value: employees.length, detail: '+2 onboarding this week' }, { label: 'Clinics covered', value: totalClinics, detail: 'Across Pravara network' }, { label: 'Clinical specialists', value: medicalStaffCount, detail: `${supportStaffCount} supporting staff` }].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/15 bg-white/10 p-3 sm:p-4">
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-sky-100/80 sm:text-xs">{stat.label}</p>
                  <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[0.65rem] font-medium text-sky-100/70 sm:text-xs">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {[{ label: 'Most staffed clinic', value: 'Central Clinic', tone: 'bg-emerald-500/10 text-emerald-600' }, { label: 'Average tenure', value: '3.8 years', tone: 'bg-sky-500/10 text-sky-600' }, { label: 'Next performance cycle', value: '15 July 2025', tone: 'bg-amber-500/10 text-amber-600' }].map((item) => (
            <div key={item.label} className={`rounded-3xl border border-slate-200/70 bg-white/95 p-4 shadow-lg shadow-slate-200/40 sm:p-5`}>
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
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Employee</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Employee ID</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Designation</th>
                  <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Clinic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-600 sm:text-sm">
                {employees.map((employee) => (
                  <tr key={employee.id} className="transition hover:bg-sky-50/60">
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-600 sm:h-10 sm:w-10 sm:text-sm">
                          {employee.name
                            .split(' ')
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join('')}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 sm:text-base">{employee.name}</p>
                          <p className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-slate-400 sm:text-xs">{employee.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 sm:px-6 sm:py-4">{employee.id}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">{employee.designation}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-semibold text-slate-500 sm:text-xs">
                        {employee.clinic}
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

