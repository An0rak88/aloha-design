import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Role, type Device, roles } from '../data/roles'

interface AppContextType {
  role: Role
  device: Device
  setRole: (role: Role) => void
  setDevice: (device: Device) => void
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>('manager')
  const [device, setDevice] = useState<Device>('computer')
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const navigate = useNavigate()

  const setRole = useCallback((newRole: Role) => {
    setRoleState(newRole)
    setDevice(roles[newRole].primeDevice)
    navigate(roles[newRole].homeRoute)
  }, [navigate])

  return (
    <AppContext.Provider value={{ role, device, setRole, setDevice, commandPaletteOpen, setCommandPaletteOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
