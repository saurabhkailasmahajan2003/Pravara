import React, { useState } from 'react';
import { 
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, 
  Legend, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, 
  PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, 
  ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, 
  Treemap, XAxis, YAxis, Sector 
} from "recharts";
import { 
  ArrowUpRight, ArrowDownRight, Activity, Users, DollarSign, 
  ShoppingBag, Target, Clock, MapPin, PieChart as PieIcon, 
  BarChart2, Layers, Zap 
} from 'lucide-react';

// --- THEME CONFIGURATION ---
const THEME = {
  primary: "#1F2937",   // Gray 800
  secondary: "#4B5563", // Gray 600
  accent: "#10B981",    // Emerald 500
  danger: "#EF4444",    // Red 500
  warning: "#F59E0B",   // Amber 500
  background: "#F9FAFB",// Gray 50
  card: "#FFFFFF",
  textMain: "#111827",
  textSub: "#6B7280",
  grid: "#E5E7EB",
  // Palette for complex charts
  colors: ["#1F2937", "#10B981", "#6366F1", "#F59E0B", "#EC4899", "#8B5CF6", "#14B8A6"]
};

// --- MOCK DATA ---

// 1. Top Line (Bar - Main Revenue)
const revenueData = [
  { month: "Jan", revenue: 320, target: 300 },
  { month: "Feb", revenue: 360, target: 320 },
  { month: "Mar", revenue: 410, target: 350 },
  { month: "Apr", revenue: 455, target: 400 },
  { month: "May", revenue: 520, target: 450 },
  { month: "Jun", revenue: 565, target: 500 },
];

// 2. Donut Chart (Market Share / Categories)
const categoryData = [
  { name: "Electronics", value: 45000 },
  { name: "Apparel", value: 32000 },
  { name: "Home", value: 28000 },
  { name: "Sports", value: 15000 },
];

// 3. Stacked Bar (Regional Sales by Channel)
const regionalSalesData = [
  { region: "North", Online: 4000, Retail: 2400, B2B: 2400 },
  { region: "South", Online: 3000, Retail: 1398, B2B: 2210 },
  { region: "East", Online: 2000, Retail: 9800, B2B: 2290 },
  { region: "West", Online: 2780, Retail: 3908, B2B: 2000 },
];

// 4. Scatter Plot (Ad Spend vs Conversion)
const scatterData = [
  { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 },
];

// 5. Radar Chart (Team Skills)
const skillData = [
  { subject: 'Closing', A: 120, B: 110, fullMark: 150 },
  { subject: 'Prospecting', A: 98, B: 130, fullMark: 150 },
  { subject: 'Demo', A: 86, B: 130, fullMark: 150 },
  { subject: 'Negotiation', A: 99, B: 100, fullMark: 150 },
  { subject: 'Technical', A: 85, B: 90, fullMark: 150 },
  { subject: 'Follow-up', A: 65, B: 85, fullMark: 150 },
];

// 6. Waterfall Data (Net Profit Walk)
const waterfallData = [
  { name: 'Gross Rev', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Cost of Goods', uv: -1500, pv: 1398, amt: 2210 },
  { name: 'Marketing', uv: -800, pv: 9800, amt: 2290 },
  { name: 'Ops', uv: -400, pv: 3908, amt: 2000 },
  { name: 'Net Profit', uv: 1300, pv: 4800, amt: 2181 },
];

// 7. Treemap Data (Product Hierarchy)
const treeMapData = [
  {
    name: 'Electronics',
    children: [
      { name: 'Laptops', size: 12000 },
      { name: 'Phones', size: 8500 },
      { name: 'Accessories', size: 3000 },
    ],
  },
  {
    name: 'Clothing',
    children: [
      { name: 'Men', size: 7000 },
      { name: 'Women', size: 15000 },
    ],
  },
  {
    name: 'Home',
    children: [
      { name: 'Furniture', size: 5000 },
      { name: 'Decor', size: 2000 },
    ],
  },
];

// 8. Gauge (Radial Bar) Data
const gaugeData = [
  { name: 'L1', value: 10, fill: '#E5E7EB' }, // Background ring
  { name: 'Satisfaction', value: 82, fill: '#10B981' },
];

// 9. Funnel Data
const funnelData = [
  { name: "Impressions", value: 1000 },
  { name: "Clicks", value: 750 },
  { name: "Visits", value: 500 },
  { name: "Add to Cart", value: 250 },
  { name: "Purchases", value: 100 },
];

// 10. Histogram (Order Value Distribution)
const histogramData = [
  { range: "0-50", count: 120 },
  { range: "51-100", count: 350 },
  { range: "101-150", count: 410 },
  { range: "151-200", count: 280 },
  { range: "200+", count: 150 },
];

// --- COMPONENTS ---

const Card = ({ title, subtitle, children, className = "", action }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col ${className}`}>
    <div className="p-5 border-b border-gray-100 flex justify-between items-start">
      <div>
        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
    <div className="p-5 flex-grow relative">
      {children}
    </div>
  </div>
);

const KpiCard = ({ title, value, trend, trendUp, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      <div className={`flex items-center mt-2 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
        {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span className="ml-1">{trend}</span>
      </div>
    </div>
    <div className={`p-3 rounded-lg ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
      <Icon size={20} />
    </div>
  </div>
);

// Custom Gantt Chart (Since Recharts doesn't support this natively effectively)
const SimpleGantt = () => {
  const tasks = [
    { name: "Q3 Marketing Campaign", start: 0, duration: 60, color: "bg-emerald-500" },
    { name: "Website Redesign", start: 20, duration: 40, color: "bg-blue-500" },
    { name: "New Product Launch", start: 45, duration: 30, color: "bg-purple-500" },
    { name: "Holiday Sale Prep", start: 70, duration: 25, color: "bg-amber-500" },
  ];

  return (
    <div className="flex flex-col h-full justify-center space-y-4">
      {tasks.map((task, idx) => (
        <div key={idx} className="relative">
          <div className="flex justify-between text-xs mb-1 text-gray-600 font-medium">
            <span>{task.name}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 relative overflow-hidden">
            <div 
              className={`absolute h-full rounded-full ${task.color} opacity-80`} 
              style={{ left: `${task.start}%`, width: `${task.duration}%` }}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between text-[10px] text-gray-400 mt-2 border-t border-gray-100 pt-2">
        <span>Week 1</span>
        <span>Week 4</span>
        <span>Week 8</span>
        <span>Week 12</span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Custom render for Waterfall Bar colors
  const getWaterfallColor = (val) => {
    if (val.name === "Net Profit" || val.name === "Gross Rev") return THEME.colors[2];
    return val.uv < 0 ? THEME.danger : THEME.accent;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* TOP NAVIGATION */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        
            
              <Layers className="text-white h-5 w-5" />
            
            <h1 className="text-xl font-bold text-gray-900 tracking-tight"><span className="text-gray-400"></span></h1>
          
          
      </header>

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ROW 1: KPI OVERVIEW (GAUGE + CARDS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Total Revenue" value="$892,300" trend="12.5%" trendUp={true} icon={DollarSign} />
          <KpiCard title="Active Users" value="34,200" trend="3.2%" trendUp={true} icon={Users} />
          <KpiCard title="Avg Order Value" value="$145.20" trend="0.8%" trendUp={false} icon={ShoppingBag} />
          
          {/* Custom Gauge Card */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between relative overflow-hidden">
             <div className="z-10">
               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer Health</p>
               <h3 className="text-2xl font-bold text-gray-900 mt-1">82/100</h3>
               <p className="text-xs text-emerald-600 font-medium mt-1">Excellent</p>
             </div>
             <div className="h-24 w-24 -mr-2">
               <ResponsiveContainer width="100%" height="100%">
                 <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" barSize={10} data={gaugeData} startAngle={180} endAngle={0}>
                   <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                 </RadialBarChart>
               </ResponsiveContainer>
             </div>
          </div>
        </section>

        {/* ROW 2: MAIN TRENDS (BAR + DONUT) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
          {/* REVENUE VS TARGET (BAR CHART) */}
          <Card title="Revenue Performance" subtitle="Actual vs Target Monthly Revenue" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="revenue" name="Actual Revenue" fill={THEME.primary} radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="target" name="Target" fill="#E5E7EB" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* SALES BY CATEGORY (DONUT CHART) */}
          <Card title="Sales Distribution" subtitle="Revenue share by category">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={THEME.colors[index % THEME.colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* ROW 3: DEEP DIVE (SCATTER + RADAR + HISTOGRAM) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[350px]">
          {/* AD SPEND CORRELATION (SCATTER) */}
          <Card title="Marketing Efficiency" subtitle="Ad Spend (X) vs Conversions (Y)">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis type="number" dataKey="x" name="Spend" unit="$" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                <YAxis type="number" dataKey="y" name="Conversions" unit="" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px' }} />
                <Scatter name="Campaigns" data={scatterData} fill={THEME.accent}>
                  {scatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={THEME.colors[index % THEME.colors.length]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </Card>

          {/* TEAM SKILLS (RADAR) */}
          <Card title="Team Performance" subtitle="Skill assessment matrix">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Team A" dataKey="A" stroke={THEME.primary} fill={THEME.primary} fillOpacity={0.3} />
                <Radar name="Team B" dataKey="B" stroke={THEME.accent} fill={THEME.accent} fillOpacity={0.3} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* ORDER VALUE DISTRIBUTION (HISTOGRAM) */}
          <Card title="Order Value Dist." subtitle="Frequency of order sizes">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histogramData} barCategoryGap={1}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="count" fill={THEME.secondary} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* ROW 4: COMPLEX ANALYSIS (WATERFALL + TREEMAP + STACKED BAR) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
          
          {/* PROFIT WALK (WATERFALL - SIMULATED) */}
          <Card title="Net Profit Walk" subtitle="Cumulative financial breakdown">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterfallData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="uv" fill="#8884d8">
                  {waterfallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getWaterfallColor(entry)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* REGIONAL CHANNEL MIX (STACKED BAR) */}
          <Card title="Regional Channels" subtitle="Sales by region & channel">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalSalesData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" axisLine={false} tickLine={false} hide />
                <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 12, fontWeight: 600}} width={40} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Online" stackId="a" fill={THEME.primary} barSize={20} />
                <Bar dataKey="Retail" stackId="a" fill={THEME.secondary} barSize={20} />
                <Bar dataKey="B2B" stackId="a" fill={THEME.accent} radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* PRODUCT HIERARCHY (TREEMAP) */}
          <Card title="Inventory Value" subtitle="Size by revenue contribution">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={treeMapData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill={THEME.primary}
              >
                 <Tooltip contentStyle={{ borderRadius: '8px' }} />
              </Treemap>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* ROW 5: PIPELINE & TIMELINE (FUNNEL + GANTT) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[300px]">
           
           {/* FUNNEL ANALYSIS (AREA CHART SIMULATION) */}
           <Card title="Conversion Funnel" subtitle="Visitor to Purchase Pipeline">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={funnelData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFunnel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={THEME.accent} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={THEME.accent} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="value" stroke={THEME.accent} fillOpacity={1} fill="url(#colorFunnel)" />
               </AreaChart>
             </ResponsiveContainer>
           </Card>

           {/* PROJECT ROADMAP (CUSTOM GANTT) */}
           <Card title="Strategic Roadmap" subtitle="Q3-Q4 Key Initiatives">
              <SimpleGantt />
           </Card>

        </section>
      </main>
    </div>
  );
}