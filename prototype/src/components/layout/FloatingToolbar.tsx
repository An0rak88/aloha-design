import { Monitor, Smartphone } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'
import { type Role, roles } from '../../data/roles'

const roleButtons: { id: Role; label: string }[] = [
  { id: 'doer', label: 'Doer' },
  { id: 'doer-recorder', label: 'D+R' },
  { id: 'manager', label: 'Manager' },
  { id: 'owner', label: 'Owner' },
  { id: 'dev', label: 'Dev' },
]

export default function FloatingToolbar() {
  const { role, device, setRole, setDevice } = useApp()

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700/50">
      {/* Role switcher */}
      <div className="flex items-center gap-1">
        {roleButtons.map(btn => (
          <button
            key={btn.id}
            onClick={() => setRole(btn.id)}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium border-none cursor-pointer transition-all ${
              role === btn.id
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25'
                : 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="w-px h-6 bg-slate-700" />

      {/* Device toggle */}
      <div className="flex items-center bg-slate-800 rounded-xl p-0.5">
        <button
          onClick={() => setDevice('computer')}
          className={`p-2 rounded-lg border-none cursor-pointer transition-all ${
            device === 'computer'
              ? 'bg-slate-600 text-white'
              : 'bg-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          <Monitor size={16} />
        </button>
        <button
          onClick={() => setDevice('phone')}
          className={`p-2 rounded-lg border-none cursor-pointer transition-all ${
            device === 'phone'
              ? 'bg-slate-600 text-white'
              : 'bg-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          <Smartphone size={16} />
        </button>
      </div>

      {/* Current role indicator */}
      <div className="text-[11px] text-slate-500 font-medium">
        {roles[role].label}
      </div>
    </div>
  )
}
