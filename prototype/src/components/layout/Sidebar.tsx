import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { PanelLeftClose, PanelLeft, LayoutGrid, ChevronLeft, ChevronDown } from 'lucide-react'
import * as Icons from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../contexts/AppContext'
import { getNavForRole, getSectionedNavForRole, hasExpandedNav } from '../../data/roles'
import type { NavItem } from '../../data/roles'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { role } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showAll, setShowAll] = useState(false)
  const [expandedNav, setExpandedNav] = useState<string | null>(null)
  const navItems = getNavForRole(role)
  const sections = getSectionedNavForRole(role)
  const canExpand = hasExpandedNav(role)

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
            }
          }}
          title={collapsed ? item.label : undefined}
          className={`w-full flex items-center gap-3 py-2.5 rounded-xl text-left border-none cursor-pointer transition-all text-[15px] ${
            collapsed ? 'px-0 justify-center' : 'px-3'
          } ${
            isActive
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25'
              : 'bg-transparent text-slate-600 hover:bg-slate-100'
          }`}
        >
          {Icon && <Icon size={18} />}
          {!collapsed && (
            <>
              <span className="font-medium flex-1">{item.label}</span>
              {hasSubItems && (
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} className={isActive ? 'text-white/70' : 'text-slate-400'} />
                </motion.div>
              )}
            </>
          )}
        </button>

        {/* Accordion sub-items */}
        {!collapsed && hasSubItems && (
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
                        }}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-sm border-none cursor-pointer transition-all ${
                          isSubActive
                            ? 'bg-green-50 text-green-700 font-medium'
                            : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'
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
    <nav className={`bg-white border-r border-slate-200 flex flex-col py-4 shrink-0 transition-all duration-200 ${
      collapsed ? 'w-[68px]' : 'w-[220px]'
    }`}>
      <div className="px-3 mb-2 flex items-center justify-between">
        {!collapsed && (
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider px-3">Navigation</span>
        )}
        <button
          onClick={onToggle}
          className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer text-slate-400 ${
            collapsed ? 'mx-auto' : ''
          }`}
        >
          {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        {showAll && canExpand ? (
          <div className="flex flex-col gap-3">
            {sections.map(section => (
              <div key={section.label}>
                {!collapsed && (
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider px-3 mb-1">{section.label}</div>
                )}
                <div className="flex flex-col gap-0.5">
                  {section.items.map(renderNavItem)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {navItems.map(renderNavItem)}
          </div>
        )}
      </div>

      {canExpand && (
        <div className="px-3 pt-3 mt-auto border-t border-slate-100">
          <button
            onClick={() => setShowAll(prev => !prev)}
            title={collapsed ? (showAll ? 'Focused view' : 'All apps') : undefined}
            className={`flex items-center gap-3 w-full py-2.5 rounded-xl border-none cursor-pointer transition-all text-[15px] ${
              collapsed ? 'px-0 justify-center' : 'px-3'
            } ${
              showAll
                ? 'bg-slate-100 text-slate-700'
                : 'bg-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            {showAll ? <ChevronLeft size={18} /> : <LayoutGrid size={18} />}
            {!collapsed && <span className="font-medium">{showAll ? 'Focused' : 'All Apps'}</span>}
          </button>
        </div>
      )}
    </nav>
  )
}
