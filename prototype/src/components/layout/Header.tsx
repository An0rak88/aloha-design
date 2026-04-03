import { Search, Command } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

export default function Header() {
  const { setCommandPaletteOpen } = useApp()

  return (
    <header className="h-[72px] bg-white border-b border-slate-200 flex items-center px-6 gap-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <span className="font-semibold text-slate-800 text-lg">Aloha</span>
      </div>

      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex-1 max-w-md mx-auto flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-2xl text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer border-none"
      >
        <Search size={16} />
        <span className="text-sm">Search...</span>
        <div className="ml-auto flex items-center gap-1 text-xs text-slate-400">
          <Command size={12} />
          <span>K</span>
        </div>
      </button>

      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-medium text-sm cursor-pointer">
        U
      </div>
    </header>
  )
}
