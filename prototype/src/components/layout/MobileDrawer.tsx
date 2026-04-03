import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import * as Icons from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../contexts/AppContext'
import { getNavForRole } from '../../data/roles'
import type { NavItem } from '../../data/roles'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { role } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [expandedNav, setExpandedNav] = useState<string | null>(null)
  const navItems = getNavForRole(role)

  const renderNavItem = (item: NavItem) => {
    const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[item.icon]
    const isActive = location.pathname === item.route
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isExpanded = expandedNav === item.id && isActive && hasSubItems

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            navigate(item.route)
            if (hasSubItems && isActive) {
              setExpandedNav(prev => prev === item.id ? null : item.id)
            } else if (hasSubItems) {
              setExpandedNav(item.id)
            } else {
              setExpandedNav(null)
              onClose()
            }
          }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left border-none cursor-pointer transition-all text-[15px] w-full ${
            isActive
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25'
              : 'bg-transparent text-slate-600 active:bg-slate-100'
          }`}
        >
          {Icon && <Icon size={18} />}
          <span className="font-medium flex-1">{item.label}</span>
          {hasSubItems && (
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={14} className={isActive ? 'text-white/70' : 'text-slate-400'} />
            </motion.div>
          )}
        </button>

        {hasSubItems && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <div className="ml-5 pl-3 border-l-2 border-green-200 mt-1 mb-1 flex flex-col gap-0.5">
                  {item.subItems!.map(sub => {
                    const currentValue = searchParams.get(item.subParam!) || item.subItems![0].id
                    const isSubActive = currentValue === sub.id
                    return (
                      <button
                        key={sub.id}
                        onClick={() => {
                          if (sub.id === item.subItems![0].id) {
                            navigate(item.route)
                          } else {
                            navigate(`${item.route}?${item.subParam}=${sub.id}`)
                          }
                          onClose()
                        }}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-sm border-none cursor-pointer transition-all ${
                          isSubActive
                            ? 'bg-green-50 text-green-700 font-medium'
                            : 'bg-transparent text-slate-500 active:bg-slate-100'
                        }`}
                      >
                        {sub.label}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    )
  }

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
                {navItems.map(renderNavItem)}
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
