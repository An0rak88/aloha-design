import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'
import Header from './Header'
import Sidebar from './Sidebar'
import BottomTabBar from './BottomTabBar'
import MobileDrawer from './MobileDrawer'
import PhoneFrame from './PhoneFrame'
import FloatingToolbar from './FloatingToolbar'
import CommandPalette from '../shared/CommandPalette'
import Avatar from '../shared/Avatar'

export default function AppLayout() {
  const { role, device } = useApp()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const useDrawer = role !== 'doer'

  if (device === 'phone') {
    return (
      <>
        <PhoneFrame>
          {/* Phone header */}
          <div className="px-4 py-2 flex items-center gap-2 bg-white border-b border-slate-100 shrink-0">
            {useDrawer ? (
              <button
                onClick={() => setDrawerOpen(prev => !prev)}
                className="p-1 rounded-lg border-none bg-transparent cursor-pointer text-slate-600 active:bg-slate-100"
              >
                <Menu size={22} />
              </button>
            ) : (
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
            )}
            <div className="ml-auto">
              <Avatar initials="U" size="sm" />
            </div>
          </div>
          {/* Phone content */}
          <div className="flex-1 overflow-y-auto bg-slate-50 relative">
            <Outlet />
            {useDrawer && <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />}
          </div>
          {!useDrawer && <BottomTabBar />}
        </PhoneFrame>
        <FloatingToolbar />
        <CommandPalette />
      </>
    )
  }

  return (
    <>
      <div className="h-screen flex bg-white">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-slate-50">
            <Outlet />
          </main>
        </div>
      </div>
      <FloatingToolbar />
      <CommandPalette />
    </>
  )
}
