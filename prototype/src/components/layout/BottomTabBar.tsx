import { useLocation, useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { useApp } from '../../contexts/AppContext'
import { getNavForRole } from '../../data/roles'

export default function BottomTabBar() {
  const { role } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const navItems = getNavForRole(role).slice(0, 5)

  return (
    <nav className="h-[80px] bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-around px-2 pb-4">
      {navItems.map(item => {
        const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[item.icon]
        const isActive = location.pathname === item.route
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.route)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 border-none bg-transparent cursor-pointer transition-colors ${
              isActive ? 'text-green-600' : 'text-slate-400'
            }`}
          >
            {Icon && <Icon size={22} />}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
