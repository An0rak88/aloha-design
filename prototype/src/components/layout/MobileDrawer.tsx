import { useLocation, useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../contexts/AppContext'
import { getNavForRole } from '../../data/roles'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { role } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const navItems = getNavForRole(role)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 z-40"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute inset-y-0 left-0 w-[260px] bg-white z-50 flex flex-col shadow-xl"
          >
            <div className="flex-1 overflow-y-auto py-2 px-3 mt-1">
              <div className="flex flex-col gap-0.5">
                {navItems.map(item => {
                  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[item.icon]
                  const isActive = location.pathname === item.route
                  return (
                    <button
                      key={item.id}
                      onClick={() => { navigate(item.route); onClose() }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left border-none cursor-pointer transition-all text-[15px] w-full ${
                        isActive
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25'
                          : 'bg-transparent text-slate-600 active:bg-slate-100'
                      }`}
                    >
                      {Icon && <Icon size={18} />}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
