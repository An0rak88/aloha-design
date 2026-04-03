import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useApp } from '../../contexts/AppContext'
import { getNavForRole, roles, allNavItems } from '../../data/roles'

export default function CommandPalette() {
  const { role, commandPaletteOpen, setCommandPaletteOpen } = useApp()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const config = roles[role]
  const accessiblePages = config.allPages || config.pages
  const navItems = allNavItems.filter(item => accessiblePages.includes(item.id))

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
      if (e.key === 'Escape') setCommandPaletteOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  useEffect(() => {
    if (commandPaletteOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [commandPaletteOpen])

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[560px] max-w-[90vw] bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
              <Search size={18} className="text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, actions..."
                className="flex-1 border-none outline-none text-base text-slate-800 bg-transparent placeholder:text-slate-400"
              />
            </div>
            <div className="py-2 max-h-[320px] overflow-y-auto">
              <div className="px-3 py-1.5">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider px-2">Pages</span>
              </div>
              {navItems.map(item => {
                const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[item.icon]
                return (
                  <button
                    key={item.id}
                    onClick={() => { navigate(item.route); setCommandPaletteOpen(false) }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-left text-slate-700 hover:bg-slate-100 border-none bg-transparent cursor-pointer transition-colors"
                  >
                    {Icon && <Icon size={16} />}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
