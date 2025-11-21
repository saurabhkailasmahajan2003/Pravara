import { Search, Bell, MessageCircle, LogOut, LayoutDashboard, Users, BarChart3, CalendarCheck2, Clock4, CalendarDays, FileText, Settings } from "lucide-react";

export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex">
        <aside className="hidden md:flex md:w-60 lg:w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-slate-200">
          <div className="w-full p-4 flex flex-col gap-2">
            <div className="px-3 py-2 mb-2 flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-emerald-600" />
              <span className="text-sm font-semibold tracking-wide">
                TEAM<span className="text-emerald-600">GROWTH</span>
              </span>
            </div>
            <NavItem active icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <NavItem icon={<Users size={18} />} label="Teams" />
            <NavItem icon={<BarChart3 size={18} />} label="Analytics" />
            <NavItem icon={<CalendarCheck2 size={18} />} label="Leaves" />
            <NavItem icon={<Clock4 size={18} />} label="Time Sheet" />
            <NavItem icon={<CalendarDays size={18} />} label="Reminder" />
            <NavItem icon={<FileText size={18} />} label="Reports" />
            <NavItem icon={<Settings size={18} />} label="Settings" />
            <div className="mt-auto pt-4">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100">
                <LogOut size={18} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <header className="bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-semibold">Hello Jane!</h1>
                <p className="text-xs text-slate-500">Today is Tuesday · 25 January, 2022</p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <div className="relative w-64">
                  <input className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Search" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
                <button className="h-10 w-10 grid place-items-center rounded-full bg-white border border-slate-200 hover:bg-slate-50">
                  <Bell size={18} />
                </button>
                <button className="h-10 w-10 grid place-items-center rounded-full bg-white border border-slate-200 hover:bg-slate-50">
                  <MessageCircle size={18} />
                </button>
                <div className="h-10 w-10 rounded-full bg-slate-300" />
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2 space-y-6">
                <Card>
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Overview</h2>
                    <span className="text-xs text-slate-500">This month</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <Stat value="23" label="Tasks Assigned" />
                    <Stat value="8" label="Task Completed" />
                    <Stat value="15" label="In Progress" />
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Task Overview</h2>
                    <span className="text-xs text-slate-500">This month</span>
                  </div>
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left text-slate-500">
                          <th className="py-2 pr-4 font-medium">Project Name</th>
                          <th className="py-2 pr-4 font-medium">Project Type</th>
                          <th className="py-2 pr-4 font-medium">Deadline</th>
                          <th className="py-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {rows.map((r, i) => (
                          <tr key={i} className="">
                            <td className="py-3 pr-4">{r.name}</td>
                            <td className="py-3 pr-4 text-slate-500">{r.type}</td>
                            <td className="py-3 pr-4 text-slate-500">{r.deadline}</td>
                            <td className="py-3">
                              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(r.status)}`}>{r.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Approaching Deadline</h2>
                    <span className="text-xs text-slate-500">This month</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    {deadlines.map((d, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4">
                        <div className="grid place-items-center h-16 w-16 rounded-xl bg-slate-50 text-center">
                          <div className="text-lg font-semibold leading-tight">{d.day}</div>
                          <div className="text-xs text-slate-500 -mt-1">{d.month}</div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{d.title}</div>
                          <div className="text-xs text-slate-500 truncate">{d.team}</div>
                          <div className="text-xs text-slate-400">{d.left} days left</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              <section className="space-y-6">
                <Card>
                  <h2 className="font-semibold">Upcoming Holidays</h2>
                  <div className="mt-4 space-y-3">
                    {holidays.map((h, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">{h.date}</div>
                          <div className="text-xs text-slate-500">{h.title}</div>
                        </div>
                        <div className="text-xs text-slate-500">{h.left} days left</div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h2 className="font-semibold">Weekly Progress</h2>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="relative h-28 w-28">
                      <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(#f59e0b 0% 49%, #e5e7eb 49% 100%)" }} />
                      <div className="absolute inset-2 rounded-full bg-white grid place-items-center">
                        <div className="text-center">
                          <div className="text-lg font-semibold">49%</div>
                          <div className="text-[10px] text-slate-500">Task Finished</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      <div>Start from</div>
                      <div className="text-slate-700">Jan 23-29, 2023</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h2 className="font-semibold">Apply For Leaves</h2>
                  <form className="mt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="date" className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                      <input type="date" className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <button type="button" className="w-full rounded-md bg-emerald-600 text-white py-2 text-sm font-medium hover:bg-emerald-700">Apply</button>
                  </form>
                </Card>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_1px_0_0_rgba(16,24,40,0.04)]">
      {children}
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

const rows = [
  { name: "Redesign Fintech Dashboard", type: "UI Design", deadline: "Feb 6", status: "In Progress" },
  { name: "Prototype Design", type: "Prototype Design", deadline: "Feb 8", status: "In Progress" },
  { name: "Prototype Design", type: "Prototype Design", deadline: "Feb 12", status: "In Progress" },
  { name: "Wireframe design for food app", type: "Wireframe design", deadline: "Feb 6", status: "In Review" },
  { name: "Prototype Design", type: "Prototype Design", deadline: "Feb 4", status: "Complete" },
  { name: "User research Emedical app", type: "UX Design", deadline: "Jan 23", status: "Overdue" },
];

const deadlines = [
  { day: "30", month: "JAN", title: "Designing app deadline", team: "Mobile App UI Design", left: 5 },
  { day: "01", month: "FEB", title: "Meeting", team: "Dashboard UI Design", left: 7 },
  { day: "31", month: "JAN", title: "Wireframe presentation", team: "Food App Wireframe", left: 6 },
  { day: "02", month: "FEB", title: "Dinner Party", team: "Office Team", left: 20 },
];

const holidays = [
  { date: "12 FEB", title: "Office Day", left: 18 },
  { date: "26 MAR", title: "Independence Day", left: 60 },
  { date: "14 APR", title: "Bengali New Year", left: 79 },
  { date: "14 APR", title: "Bengali New Year", left: 79 },
];

function statusClass(status) {
  switch (status) {
    case "In Progress":
      return "bg-blue-50 text-blue-700";
    case "In Review":
      return "bg-amber-50 text-amber-700";
    case "Complete":
      return "bg-emerald-50 text-emerald-700";
    case "Overdue":
      return "bg-rose-50 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
