import { useState } from 'react'
import { Send } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const employees = ['Marcus K.', 'Ana R.', 'James T.', 'David L.', 'Sarah P.', 'Lisa W.', 'Carlos M.']
const greenhouses = ['—', 'K0', '01', '03', '04', '05', '06', '07', '08', 'HK']
const priorities = ['high', 'medium', 'low'] as const

export default function AssignTask() {
  const { device } = useApp()
  const isPhone = device === 'phone'
  const [assigned, setAssigned] = useState(false)

  if (assigned) {
    return (
      <div className={`${isPhone ? 'p-4' : 'p-6'} flex items-center justify-center h-full`}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-4">
            <Send size={28} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Task assigned</h3>
          <p className="text-sm text-slate-500 mb-5">The team member has been notified.</p>
          <button
            onClick={() => setAssigned(false)}
            className="px-5 py-2.5 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 border-none cursor-pointer"
          >
            Assign another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${isPhone ? 'p-4' : 'p-6'}`}>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Task title</label>
          <input
            type="text"
            placeholder="e.g. Harvest GH K0 — Cukes Block A"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Assign to</label>
          <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 cursor-pointer">
            <option value="">Select employee...</option>
            {employees.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 cursor-pointer">
              {priorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Greenhouse</label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 cursor-pointer">
              {greenhouses.map(gh => <option key={gh} value={gh}>{gh === '—' ? 'None' : `GH ${gh}`}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Instructions</label>
          <textarea
            rows={4}
            placeholder="Detailed instructions for the task..."
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 resize-none"
          />
        </div>

        <button
          onClick={() => setAssigned(true)}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 border-none cursor-pointer mt-2"
        >
          <Send size={16} />
          Assign Task
        </button>
      </div>
    </div>
  )
}
