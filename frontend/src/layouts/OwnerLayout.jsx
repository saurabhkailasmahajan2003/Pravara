import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Search, Bell, MessageCircle, LogOut, LayoutDashboard, Users, BarChart3, CalendarCheck2, Clock4, CalendarDays, FileText, Settings } from "lucide-react";
import { useAuth } from "../auth/AuthContext.jsx";

export default function OwnerLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  function onLogout() {
    logout();
    navigate("/login", { replace: true });
  }
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
            <SideItem to="/owner/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <SideItem to="/owner/teams" icon={<Users size={18} />} label="Teams" />
            <SideItem to="/owner/employees" icon={<Users size={18} />} label="Employees" />
            <SideItem to="/owner/analytics" icon={<BarChart3 size={18} />} label="Analytics" />
            <SideItem to="/owner/leaves" icon={<CalendarCheck2 size={18} />} label="Leaves" />
            <SideItem to="/owner/time-sheet" icon={<Clock4 size={18} />} label="Time Sheet" />
            <SideItem to="/owner/reminder" icon={<CalendarDays size={18} />} label="Reminder" />
            <SideItem to="/owner/reports" icon={<FileText size={18} />} label="Reports" />
            <SideItem to="/owner/settings" icon={<Settings size={18} />} label="Settings" />
            <div className="mt-auto pt-4">
              <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100">
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
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function SideItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </NavLink>
  );
}
