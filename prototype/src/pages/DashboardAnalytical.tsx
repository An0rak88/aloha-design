import { TrendingUp } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useApp } from '../contexts/AppContext'

const weeklyHarvest = [
  { week: 'W9', cukes: 38000, lettuce: 12000 },
  { week: 'W10', cukes: 41000, lettuce: 11500 },
  { week: 'W11', cukes: 39500, lettuce: 13000 },
  { week: 'W12', cukes: 43000, lettuce: 12800 },
  { week: 'W13', cukes: 45200, lettuce: 14000 },
]

const chemistryTrend = [
  { date: '3/25', ec: 2.1, ph: 5.8 },
  { date: '3/26', ec: 2.2, ph: 5.7 },
  { date: '3/27', ec: 2.3, ph: 5.6 },
  { date: '3/28', ec: 2.4, ph: 5.8 },
  { date: '3/29', ec: 2.6, ph: 5.9 },
  { date: '3/30', ec: 2.5, ph: 5.7 },
  { date: '4/1', ec: 2.8, ph: 5.6 },
]

const gradeDistribution = [
  { name: 'Grade 1', value: 95.2, color: '#22c55e' },
  { name: 'Grade 2', value: 3.8, color: '#f59e0b' },
  { name: 'Reject', value: 1.0, color: '#ef4444' },
]

const laborEfficiency = [
  { gh: 'K0', efficiency: 164 },
  { gh: '01', efficiency: 148 },
  { gh: '08', efficiency: 248 },
  { gh: 'HK', efficiency: 94 },
  { gh: '05', efficiency: 67 },
  { gh: '06', efficiency: 132 },
]

export default function DashboardAnalytical() {
  const { device } = useApp()
  const [searchParams] = useSearchParams()
  const activeSection = searchParams.get('section') || 'Overview'
  const isPhone = device === 'phone'

  if (isPhone) {
    return (
      <div className="p-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl p-3 border border-slate-200">
            <div className="text-xs text-slate-400">Weekly Harvest</div>
            <div className="text-2xl font-bold text-slate-800">45.2K<span className="text-xs text-slate-400 ml-1">lbs</span></div>
            <div className="text-xs text-green-600 font-medium flex items-center gap-0.5"><TrendingUp size={10} /> +5.1%</div>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-slate-200">
            <div className="text-xs text-slate-400">Grade 1</div>
            <div className="text-2xl font-bold text-green-600">95.2%</div>
            <div className="text-xs text-green-600 font-medium flex items-center gap-0.5"><TrendingUp size={10} /> +1.8%</div>
          </div>
        </div>

        {/* Mini chart */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200">
          <div className="text-sm font-semibold text-slate-800 mb-3">Weekly Harvest Trend</div>
          <div className="h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyHarvest}>
                <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Bar dataKey="cukes" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lettuce" fill="#86efac" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto p-6">
        {/* Chart grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Weekly harvest */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4">Weekly Harvest Volume</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyHarvest}>
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cukes" name="Cukes" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="lettuce" name="Lettuce" fill="#86efac" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grade distribution */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4">Grade Distribution</h3>
            <div className="h-[220px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                    {gradeDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 ml-4">
                {gradeDistribution.map(g => (
                  <div key={g.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: g.color }} />
                    <span className="text-sm text-slate-600">{g.name}</span>
                    <span className="text-sm font-bold text-slate-800">{g.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chemistry trend */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4">Chemistry EC Trend (K0)</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chemistryTrend}>
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[1.5, 3.5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="ec" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="EC" />
                  {/* Threshold line */}
                  <Line type="monotone" dataKey={() => 2.3} stroke="#94a3b8" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Labor efficiency */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4">Labor Efficiency (lb/hr/person)</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={laborEfficiency} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="gh" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip />
                  <Bar dataKey="efficiency" fill="#22c55e" radius={[0, 8, 8, 0]}>
                    {laborEfficiency.map((entry, i) => (
                      <Cell key={i} fill={entry.efficiency < 100 ? '#f59e0b' : '#22c55e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
    </div>
  )
}
