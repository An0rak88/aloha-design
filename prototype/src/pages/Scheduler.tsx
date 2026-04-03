import { ChevronLeft, ChevronRight, Plus, User } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'

const employees = [
  { name: 'Marcus K.', role: 'Harvest Lead', dept: 'Grow' },
  { name: 'Ana R.', role: 'Scout', dept: 'IPM' },
  { name: 'James T.', role: 'Maintenance', dept: 'Maintenance' },
  { name: 'David L.', role: 'Grower', dept: 'Grow' },
  { name: 'Carlos M.', role: 'Spray Tech', dept: 'Grow' },
  { name: 'Sarah P.', role: 'Seeding', dept: 'Grow' },
  { name: 'Lisa W.', role: 'Packer', dept: 'Pack' },
]

const days = ['Mon 3/30', 'Tue 3/31', 'Wed 4/1', 'Thu 4/2', 'Fri 4/3', 'Sat 4/4', 'Sun 4/5']

type ShiftType = 'AM' | 'PM' | 'Full' | 'Off' | null

const scheduleData: Record<string, ShiftType[]> = {
  'Marcus K.': ['Full', 'Full', 'Full', 'Full', 'Full', 'AM', 'Off'],
  'Ana R.': ['AM', 'AM', 'AM', 'AM', 'AM', 'Off', 'Off'],
  'James T.': ['Full', 'Full', 'Full', 'Full', 'Full', 'Off', 'Off'],
  'David L.': ['AM', 'AM', 'AM', 'AM', 'AM', 'AM', 'Off'],
  'Carlos M.': ['Full', 'Full', 'Full', 'Full', 'Full', 'Off', 'Off'],
  'Sarah P.': ['AM', 'AM', 'AM', 'AM', 'AM', 'Off', 'Off'],
  'Lisa W.': ['Full', 'Full', 'Full', 'Full', 'Full', 'AM', 'Off'],
}

const shiftStyles: Record<string, string> = {
  'AM': 'bg-blue-100 text-blue-700 border-blue-200',
  'PM': 'bg-purple-100 text-purple-700 border-purple-200',
  'Full': 'bg-green-100 text-green-700 border-green-200',
  'Off': 'bg-slate-50 text-slate-300 border-slate-100',
}

export default function Scheduler() {
  const { device } = useApp()
  const [searchParams] = useSearchParams()
  const activeFilter = searchParams.get('dept') || 'All'
  const isPhone = device === 'phone'

  const filtered = activeFilter === 'All' ? employees : employees.filter(e => e.dept === activeFilter)

  if (isPhone) {
    return (
      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto pb-3 mb-3">
          {depts.map(d => (
            <button
              key={d}
              onClick={() => setActiveFilter(d)}
              className={`px-3 py-1.5 rounded-2xl text-sm font-medium whitespace-nowrap border-none cursor-pointer ${
                activeFilter === d ? 'bg-green-100 text-green-700' : 'bg-white text-slate-500'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {filtered.map(emp => (
            <div key={emp.name} className="bg-white rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <User size={14} className="text-green-700" />
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">{emp.name}</div>
                  <div className="text-xs text-slate-400">{emp.role}</div>
                </div>
              </div>
              <div className="flex gap-1">
                {days.map((day, i) => {
                  const shift = scheduleData[emp.name]?.[i]
                  return (
                    <div key={day} className="flex-1 text-center">
                      <div className="text-[9px] text-slate-400 mb-1">{day.split(' ')[0]}</div>
                      <div className={`py-1 rounded-lg text-[10px] font-bold border ${shift ? shiftStyles[shift] : 'bg-slate-50 text-slate-300'}`}>
                        {shift || '—'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto p-6 pb-20">
        <div className="flex items-center mb-5">
          <div className="flex items-center gap-3">
            <button className="p-1 rounded-lg hover:bg-slate-200 transition-colors border-none bg-transparent cursor-pointer">
              <ChevronLeft size={16} className="text-slate-500" />
            </button>
            <span className="text-sm font-medium text-slate-600">Week of March 30, 2026</span>
            <button className="p-1 rounded-lg hover:bg-slate-200 transition-colors border-none bg-transparent cursor-pointer">
              <ChevronRight size={16} className="text-slate-500" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left px-4 py-3 text-slate-500 font-medium text-xs w-[180px]">Employee</th>
                {days.map(day => (
                  <th key={day} className="text-center px-2 py-3 text-slate-500 font-medium text-xs">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.name} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <User size={12} className="text-green-700" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 text-sm">{emp.name}</div>
                        <div className="text-xs text-slate-400">{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  {days.map((day, i) => {
                    const shift = scheduleData[emp.name]?.[i]
                    return (
                      <td key={day} className="px-2 py-4 text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-8 rounded-xl text-xs font-bold border cursor-pointer hover:opacity-80 transition-opacity ${shift ? shiftStyles[shift] : 'bg-slate-50 text-slate-300 border-slate-100'}`}>
                          {shift || '—'}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sticky bottom-6 flex justify-end pointer-events-none z-30">
          <button className="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none cursor-pointer shadow-xl shadow-green-500/30 flex items-center justify-center hover:shadow-2xl transition-shadow">
            <Plus size={24} />
          </button>
        </div>
    </div>
  )
}
