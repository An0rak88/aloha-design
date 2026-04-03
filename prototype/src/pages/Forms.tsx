import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

export default function Forms() {
  const { device } = useApp()
  const isPhone = device === 'phone'
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className={`${isPhone ? 'p-4' : 'p-6'} flex items-center justify-center h-full`}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-4">
            <RotateCcw size={28} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Entry saved</h3>
          <p className="text-sm text-slate-500 mb-5">Harvest record submitted.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2.5 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 border-none cursor-pointer"
          >
            New Entry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${isPhone ? 'p-4' : 'p-6'}`}>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Harvest Date *</label>
          <input type="date" defaultValue="2026-04-01" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Greenhouse *</label>
          <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 cursor-pointer">
            <option value="">Select...</option>
            <option>K0</option><option>01</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option><option>HK</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Clock-in Time *</label>
            <input type="time" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Clock-out Time *</label>
            <input type="time" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5"># of People *</label>
          <input type="number" placeholder="0" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Total Lbs *</label>
          <input type="number" placeholder="0" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Grade 1 Lbs *</label>
          <input type="number" placeholder="0" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="flex items-center justify-center w-full py-3 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 border-none cursor-pointer mt-2"
        >
          Save Entry
        </button>
      </div>
    </div>
  )
}
