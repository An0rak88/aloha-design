import { Search, Command } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'
import Avatar from '../shared/Avatar'

export default function Header() {
  const { setCommandPaletteOpen } = useApp()

  return (
    <header className="h-[60px] bg-white border-b border-slate-200 flex items-center px-6 gap-4 shrink-0">
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

      <Avatar initials="U" size="md" />
    </header>
  )
}
