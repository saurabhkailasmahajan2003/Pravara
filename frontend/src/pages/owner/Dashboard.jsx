import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Plus,
  Search,
  TrendingUp,
  Briefcase,
  Plane,
  AlertCircle,
  Paperclip,
  MessageSquare,
  DollarSign,
  Wifi
} from "lucide-react";
import { useApi } from "../../lib/api";

// --- UI Components ---

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md ${className}`}>
      {children}
    </div>
  );
}

function StatCard({ value, label, subLabel, icon: Icon, colorClass }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-5 transition-all hover:border-slate-200 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${colorClass} bg-opacity-10`}>
          <Icon className={`h-6 w-6 ${colorClass.replace("bg-", "text-")}`} />
        </div>
      </div>
      {subLabel && (
        <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
          <TrendingUp className="mr-1 h-3 w-3" />
          <span>{subLabel}</span>
        </div>
      )}
    </div>
  );
}

function Badge({ status }) {
  const styles = {
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200 ring-blue-100",
    "In Review": "bg-amber-50 text-amber-700 border-amber-200 ring-amber-100",
    "Complete": "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-100",
    "Overdue": "bg-rose-50 text-rose-700 border-rose-200 ring-rose-100",
  };
  
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ level }) {
  const configs = {
    Critical: { color: "text-rose-600", bg: "bg-rose-600" },
    High: { color: "text-orange-600", bg: "bg-orange-600" },
    Medium: { color: "text-blue-600", bg: "bg-blue-600" },
    Low: { color: "text-slate-500", bg: "bg-slate-500" },
  };
  const config = configs[level] || configs.Low;

  return (
    <div className="flex items-center gap-1.5">
      <div className={`h-2 w-2 rounded-full ${config.bg}`} />
      <span className={`text-xs font-medium ${config.color}`}>{level}</span>
    </div>
  );
}

function AvatarStack({ users, limit = 3 }) {
  const show = users.slice(0, limit);
  const remaining = users.length - limit;

  return (
    <div className="flex -space-x-2">
      {show.map((user, i) => (
        <div key={i} className="relative inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 uppercase cursor-help" title={user}>
          {user.charAt(0) + user.charAt(1)}
        </div>
      ))}
      {remaining > 0 && (
        <div className="relative inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-500">
          +{remaining}
        </div>
      )}
    </div>
  );
}

function ProgressBar({ percent }) {
  const radius = 34; // Slightly larger
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-28 w-28 transform -rotate-90">
        <circle className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="56" cy="56" />
        <circle
          className="text-indigo-600 transition-all duration-1000 ease-out"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="56"
          cy="56"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-slate-900">{percent}%</span>
        <span className="text-[10px] font-medium text-slate-400 uppercase">Done</span>
      </div>
    </div>
  );
}

// --- Data Logic ---

function useDashboardData() {
  const api = useApi();
  const [tasks, setTasks] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [team, setTeam] = useState([]);
  const [progress, setProgress] = useState({ percent: 0, range: "" });
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    setLoading(true);
    try {
      // Enhanced Mock Data
      const [t, d, h, tm, p] = await Promise.all([
        api.get("/api/tasks").catch(() => [
            { id: 1, name: "Redesign Homepage", department: "Design", priority: "Critical", budget: 12500, assignees: ["Sarah", "Mike", "John"], deadline: "Oct 24", status: "In Progress", files: 4, health: "On Track" },
            { id: 2, name: "Mobile App API", department: "Engineering", priority: "High", budget: 8400, assignees: ["Alex", "Sam"], deadline: "Oct 28", status: "In Review", files: 12, health: "At Risk" },
            { id: 3, name: "Q3 Marketing Report", department: "Marketing", priority: "Medium", budget: 2000, assignees: ["Lisa"], deadline: "Oct 20", status: "Complete", files: 2, health: "On Track" },
            { id: 4, name: "User Interviews", department: "Research", priority: "Low", budget: 1500, assignees: ["Pat", "Kelly", "Jim", "Tom"], deadline: "Nov 02", status: "In Progress", files: 8, health: "On Track" },
        ]),
        api.get("/api/deadlines").catch(() => [
            { day: "24", month: "OCT", title: "Homepage Launch", team: "Design Team", left: 3 },
            { day: "28", month: "OCT", title: "Client Meeting", team: "Sales Team", left: 7 },
        ]),
        api.get("/api/holidays").catch(() => [
            { date: "25 Dec", title: "Christmas Day", left: 65 },
            { date: "01 Jan", title: "New Year", left: 72 },
        ]),
        api.get("/api/team").catch(() => [
            { name: "Sarah Connor", role: "Product Lead", status: "Online" },
            { name: "John Doe", role: "Senior Dev", status: "In Meeting" },
            { name: "Mike Ross", role: "Designer", status: "Offline" },
        ]),
        api.get("/api/progress").catch(() => ({ percent: 68, range: "Oct 23-29, 2025" })),
      ]);
      setTasks(t || []);
      setDeadlines(d || []);
      setHolidays(h || []);
      setTeam(tm || []);
      setProgress(p || { percent: 0 });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, []);

  return { api, tasks, setTasks, deadlines, setDeadlines, holidays, setHolidays, team, progress, setProgress, loading };
}

// --- Utilities ---
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

export default function Dashboard() {
  const { api, tasks, setTasks, deadlines, setDeadlines, holidays, team, progress, setProgress, loading } = useDashboardData();

  const overview = useMemo(() => {
    const totalBudget = tasks.reduce((acc, curr) => acc + (curr.budget || 0), 0);
    const activeTasks = tasks.filter(t => t.status !== "Complete").length;
    const completed = tasks.filter(t => t.status === "Complete").length;
    return { totalBudget, activeTasks, completed };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans text-slate-900">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Project overview, budgets, and team availability.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4"/>
                <input className="h-10 w-64 rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Search projects..." />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                <Plus size={16} />
                <span>Create Task</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Column (Main Content) --- */}
        <section className="lg:col-span-2 space-y-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard 
                value={loading ? "-" : formatCurrency(overview.totalBudget)} 
                label="Total Budget" 
                subLabel="+8% vs last month"
                icon={DollarSign}
                colorClass="bg-emerald-500 text-emerald-600" 
            />
            <StatCard 
                value={loading ? "-" : overview.activeTasks} 
                label="Active Tasks" 
                subLabel="4 Critical priority"
                icon={Briefcase}
                colorClass="bg-indigo-500 text-indigo-600" 
            />
            <StatCard 
                value={loading ? "-" : overview.completed} 
                label="Completed" 
                subLabel="12 this week"
                icon={CheckCircle2}
                colorClass="bg-slate-500 text-slate-600" 
            />
          </div>

          {/* Main Task Table */}
          <Card className="overflow-hidden p-0 border-0 shadow-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Active Projects</h2>
                <p className="text-sm text-slate-500 mt-1">Manage deliverables and track budgets</p>
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                  <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/80 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Project Details</th>
                    <th className="px-6 py-4 font-semibold">Team</th>
                    <th className="px-6 py-4 font-semibold">Priority</th>
                    <th className="px-6 py-4 font-semibold">Budget</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {tasks.map((r) => (
                    <tr key={r.id} className="group hover:bg-slate-50/50 transition-colors">
                      {/* Project Name & Dept */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full ${r.health === 'At Risk' ? 'bg-rose-500' : 'bg-emerald-500'}`} title={`Health: ${r.health}`} />
                            <div>
                                <div className="font-semibold text-slate-900">{r.name}</div>
                                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                                    <span>{r.department}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Paperclip size={10}/> {r.files}</span>
                                </div>
                            </div>
                        </div>
                      </td>
                      
                      {/* Team Avatars */}
                      <td className="px-6 py-4">
                         <AvatarStack users={r.assignees} />
                      </td>

                      {/* Priority */}
                      <td className="px-6 py-4">
                        <PriorityBadge level={r.priority} />
                      </td>

                      {/* Budget */}
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {formatCurrency(r.budget)}
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <Badge status={r.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">View All Projects</button>
            </div>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Upcoming Deadlines</h2>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View Calendar</a>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {deadlines.map((d, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border border-slate-100 p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50/30 hover:shadow-sm cursor-pointer">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-900 shadow-sm">
                    <span className="text-lg font-bold leading-none">{d.day}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{d.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate">{d.title}</h3>
                    <p className="text-xs text-slate-500">{d.team}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 w-full flex-1 rounded-full bg-slate-100 overflow-hidden">
                            <div className={`h-full rounded-full ${d.left < 4 ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{width: `${100 - (d.left * 10)}%`}}></div>
                        </div>
                        <span className={`text-xs font-bold ${d.left < 4 ? 'text-rose-600' : 'text-slate-500'}`}>{d.left}d</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* --- Right Column (Sidebar) --- */}
        <section className="space-y-8">
          
          {/* Progress Widget */}
          <Card className="bg-slate-900 text-white border-none shadow-xl shadow-slate-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold">Weekly Sprint</h2>
                    <button className="text-slate-400 hover:text-white"><MoreHorizontal size={18} /></button>
                </div>
                
                <div className="flex flex-col items-center justify-center py-2">
                    <ProgressBar percent={progress.percent} />
                </div>

                <div className="mt-8 space-y-3">
                    <div className="flex justify-between items-center text-sm pb-3 border-b border-white/10">
                        <span className="text-slate-400">Timeline</span>
                        <span className="font-medium">{progress.range}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Health</span>
                        <span className="font-medium text-emerald-400 flex items-center gap-1"><Wifi size={12}/> Excellent</span>
                    </div>
                </div>
            </div>
          </Card>

          {/* Team Availability Widget (New) */}
          <Card>
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900">Team Status</h2>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wide">Live</span>
            </div>
            <div className="space-y-4">
                {team.map((member, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold border border-indigo-200">
                                {member.name.charAt(0)}
                            </div>
                            <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                                member.status === 'Online' ? 'bg-emerald-500' : 
                                member.status === 'In Meeting' ? 'bg-amber-500' : 'bg-slate-300'
                            }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-900 truncate">{member.name}</h4>
                            <p className="text-xs text-slate-500 truncate">{member.role}</p>
                        </div>
                        <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                            <MessageSquare size={14} />
                        </button>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-medium text-slate-500 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-all">
                + Add Team Member
            </button>
          </Card>

          {/* Leave Application */}
          <Card className="bg-gradient-to-b from-white to-slate-50/50">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg ring-1 ring-indigo-100">
                    <Plane size={18} />
                </div>
                <div>
                    <h2 className="text-base font-bold text-slate-900">Time Off</h2>
                    <p className="text-xs text-slate-500">Request leave</p>
                </div>
            </div>
            <form className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">From</label>
                    <input type="date" className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">To</label>
                    <input type="date" className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" />
                </div>
              </div>
              <button type="button" className="w-full mt-2 rounded-lg bg-slate-900 text-white py-2.5 text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                Submit Request
              </button>
            </form>
          </Card>

        </section>
      </div>
    </div>
  );
}