import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../contexts/AppContext'

const harvestTrend = [
  { day: 'Mon', lbs: 6200 },
  { day: 'Tue', lbs: 7100 },
  { day: 'Wed', lbs: 6800 },
  { day: 'Thu', lbs: 7500 },
  { day: 'Fri', lbs: 8200 },
  { day: 'Sat', lbs: 5100 },
  { day: 'Today', lbs: 7334 },
]

const ghYields = [
  { gh: 'K0', lbs: 1914 },
  { gh: '01', lbs: 1581 },
  { gh: '08', lbs: 1376 },
  { gh: 'HK', lbs: 1463 },
  { gh: '05', lbs: 908 },
  { gh: '06', lbs: 1092 },
]

const kpis = [
  { label: 'Total Harvest', value: '7,334', unit: 'lbs', change: '+12%', up: true, color: 'green' },
  { label: 'Grade 1 %', value: '95.2', unit: '%', change: '+1.8%', up: true, color: 'green' },
  { label: 'lb/hr/person', value: '142', unit: '', change: '-5%', up: false, color: 'amber' },
  { label: 'Chemistry Flags', value: '3', unit: '', change: '+2', up: false, color: 'red' },
]

const tasks = [
  { title: 'Chemistry readings — all houses', status: 'in-progress', assignee: 'David L.' },
  { title: 'Harvest GH K0', status: 'in-progress', assignee: 'Marcus K.' },
  { title: 'Scout GH 08 for aphids', status: 'todo', assignee: 'Ana R.' },
]

export default function DashboardKPI() {
  const { device } = useApp()
  const isPhone = device === 'phone'

  if (isPhone) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-slate-800 m-0">Good morning, Eric</h1>
          <p className="text-sm text-slate-500 mt-1">Wednesday, April 1</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {kpis.map(kpi => (
            <div key={kpi.label} className="bg-white rounded-2xl p-3 border border-slate-200">
              <div className="text-xs text-slate-400 mb-1">{kpi.label}</div>
              <div className="text-2xl font-bold text-slate-800">{kpi.value}<span className="text-sm text-slate-400 font-normal ml-0.5">{kpi.unit}</span></div>
              <div className={`text-xs font-medium mt-1 ${kpi.up ? 'text-green-600' : kpi.color === 'red' ? 'text-red-600' : 'text-amber-600'}`}>
                {kpi.change} vs last week
              </div>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 mb-4">
          <div className="text-sm font-semibold text-slate-800 mb-3">This Week's Harvest</div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={harvestTrend}>
                <defs>
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Area type="monotone" dataKey="lbs" stroke="#22c55e" fill="url(#greenGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 m-0">Good morning, Eric</h1>
          <p className="text-sm text-slate-500 mt-1">Wednesday, April 1, 2026 — Daily Operations Dashboard</p>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">{kpi.label}</span>
              {kpi.up ? <TrendingUp size={16} className="text-green-500" /> :
               kpi.color === 'red' ? <AlertTriangle size={16} className="text-red-500" /> :
               <TrendingDown size={16} className="text-amber-500" />}
            </div>
            <div className="text-3xl font-bold text-slate-800">{kpi.value}<span className="text-base text-slate-400 font-normal ml-1">{kpi.unit}</span></div>
            <div className={`text-sm font-medium mt-1 ${kpi.up ? 'text-green-600' : kpi.color === 'red' ? 'text-red-600' : 'text-amber-600'}`}>
              {kpi.change} vs last week
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Harvest trend chart */}
        <div className="col-span-2 bg-white rounded-2xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Weekly Harvest Trend</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={harvestTrend}>
                <defs>
                  <linearGradient id="greenGradDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="lbs" stroke="#22c55e" fill="url(#greenGradDesktop)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tasks today */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Today's Tasks</h3>
            <span className="text-xs px-2 py-1 rounded-lg bg-amber-100 text-amber-700 font-medium">{tasks.length} active</span>
          </div>
          <div className="flex flex-col gap-3">
            {tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-2">
                {task.status === 'in-progress' ?
                  <CheckCircle2 size={16} className="text-amber-500 mt-0.5 shrink-0" /> :
                  <CheckCircle2 size={16} className="text-slate-300 mt-0.5 shrink-0" />
                }
                <div>
                  <div className="text-sm text-slate-700">{task.title}</div>
                  <div className="text-xs text-slate-400">{task.assignee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GH Yield comparison */}
        <div className="col-span-2 bg-white rounded-2xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Greenhouse Yield Today</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ghYields}>
                <XAxis dataKey="gh" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="lbs" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Alerts</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2 p-3 bg-red-50 rounded-xl border border-red-200">
              <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
              <div className="text-sm text-red-700">GH K0 drain EC at 2.8 — above 2.3 threshold</div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
              <div className="text-sm text-amber-700">GH 05 lb/hr below target (67 vs 120)</div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
              <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
              <div className="text-sm text-green-700">All scouting reports submitted on time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
