import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../contexts/AppContext'
import PageShell from '../components/shared/PageShell'
import Card from '../components/shared/Card'

const yieldData = [
  { date: '3/25', k0: 1850, '01': 1500, '08': 1200 },
  { date: '3/26', k0: 1920, '01': 1620, '08': 1350 },
  { date: '3/27', k0: 1780, '01': 1480, '08': 1280 },
  { date: '3/28', k0: 1900, '01': 1550, '08': 1400 },
  { date: '3/29', k0: 2010, '01': 1600, '08': 1320 },
  { date: '3/30', k0: 1870, '01': 1530, '08': 1380 },
  { date: '4/1', k0: 1914, '01': 1581, '08': 1376 },
]

const tableData = [
  { date: '4/1', k0: 1914, g1k0: 98, o1: 1581, g1o1: 96, o8: 1376, g1o8: 99 },
  { date: '3/31', k0: 1870, g1k0: 97, o1: 1530, g1o1: 95, o8: 1380, g1o8: 97 },
  { date: '3/30', k0: 2010, g1k0: 96, o1: 1600, g1o1: 94, o8: 1320, g1o8: 98 },
  { date: '3/29', k0: 1900, g1k0: 98, o1: 1550, g1o1: 96, o8: 1400, g1o8: 97 },
  { date: '3/28', k0: 1780, g1k0: 95, o1: 1480, g1o1: 93, o8: 1280, g1o8: 96 },
]

export default function TableChartCombo() {
  const { device } = useApp()
  const [selectedGH, setSelectedGH] = useState<string[]>(['k0', '01', '08'])
  const isPhone = device === 'phone'

  if (isPhone) {
    return (
      <PageShell phone>
        <Card className="p-4 mb-4">
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldData}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="k0" stroke="#22c55e" strokeWidth={2} dot={false} name="K0" />
                <Line type="monotone" dataKey="01" stroke="#3b82f6" strokeWidth={2} dot={false} name="01" />
                <Line type="monotone" dataKey="08" stroke="#f59e0b" strokeWidth={2} dot={false} name="08" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="flex flex-col gap-2">
          {tableData.slice(0, 3).map(row => (
            <Card key={row.date} className="p-3">
              <div className="text-xs text-slate-400 mb-2">{row.date}</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><div className="text-xs text-slate-400">K0</div><div className="font-bold text-slate-800">{row.k0.toLocaleString()}</div></div>
                <div><div className="text-xs text-slate-400">01</div><div className="font-bold text-slate-800">{row.o1.toLocaleString()}</div></div>
                <div><div className="text-xs text-slate-400">08</div><div className="font-bold text-slate-800">{row.o8.toLocaleString()}</div></div>
              </div>
            </Card>
          ))}
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="flex items-center justify-end mb-5">
        <div className="flex items-center gap-3">
          {[{ id: 'k0', label: 'K0', color: '#22c55e' }, { id: '01', label: '01', color: '#3b82f6' }, { id: '08', label: '08', color: '#f59e0b' }].map(gh => (
            <button
              key={gh.id}
              onClick={() => setSelectedGH(prev => prev.includes(gh.id) ? prev.filter(g => g !== gh.id) : [...prev, gh.id])}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-medium border cursor-pointer transition-all ${
                selectedGH.includes(gh.id) ? 'border-slate-300 bg-white' : 'border-transparent bg-slate-100 text-slate-400'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: gh.color }} />
              GH {gh.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <Card className="p-5 mb-4">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={yieldData}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              {selectedGH.includes('k0') && <Line type="monotone" dataKey="k0" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4 }} name="GH K0" />}
              {selectedGH.includes('01') && <Line type="monotone" dataKey="01" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} name="GH 01" />}
              {selectedGH.includes('08') && <Line type="monotone" dataKey="08" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} name="GH 08" />}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Data table */}
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs">Date</th>
              <th className="text-right px-4 py-3 text-xs font-medium" style={{ color: '#22c55e' }}>K0 (lbs)</th>
              <th className="text-right px-4 py-3 text-xs font-medium" style={{ color: '#22c55e' }}>K0 G1%</th>
              <th className="text-right px-4 py-3 text-xs font-medium" style={{ color: '#3b82f6' }}>01 (lbs)</th>
              <th className="text-right px-4 py-3 text-xs font-medium" style={{ color: '#3b82f6' }}>01 G1%</th>
              <th className="text-right px-4 py-3 text-xs font-medium" style={{ color: '#f59e0b' }}>08 (lbs)</th>
              <th className="text-right px-4 py-3 text-xs font-medium" style={{ color: '#f59e0b' }}>08 G1%</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(row => (
              <tr key={row.date} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-700">{row.date}</td>
                <td className="px-4 py-4 text-right font-semibold text-slate-800">{row.k0.toLocaleString()}</td>
                <td className="px-4 py-4 text-right"><span className={row.g1k0 >= 95 ? 'text-green-600 font-semibold' : 'text-amber-600'}>{row.g1k0}%</span></td>
                <td className="px-4 py-4 text-right font-semibold text-slate-800">{row.o1.toLocaleString()}</td>
                <td className="px-4 py-4 text-right"><span className={row.g1o1 >= 95 ? 'text-green-600 font-semibold' : 'text-amber-600'}>{row.g1o1}%</span></td>
                <td className="px-4 py-4 text-right font-semibold text-slate-800">{row.o8.toLocaleString()}</td>
                <td className="px-4 py-4 text-right"><span className={row.g1o8 >= 95 ? 'text-green-600 font-semibold' : 'text-amber-600'}>{row.g1o8}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </PageShell>
  )
}
