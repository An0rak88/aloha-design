export type Role = 'doer' | 'doer-recorder' | 'manager' | 'owner' | 'dev'
export type Device = 'computer' | 'phone'

export interface RoleConfig {
  id: Role
  label: string
  shortLabel: string
  primeDevice: Device
  homeRoute: string
  pages: string[]
  allPages?: string[]
  navLabelOverrides?: Record<string, string>
}

export const roles: Record<Role, RoleConfig> = {
  doer: {
    id: 'doer',
    label: 'Doer',
    shortLabel: 'Doer',
    primeDevice: 'phone',
    homeRoute: '/tasks',
    pages: ['tasks', 'messages', 'chat', 'clock-in'],
  },
  'doer-recorder': {
    id: 'doer-recorder',
    label: 'Doer + Recorder',
    shortLabel: 'D+R',
    primeDevice: 'phone',
    homeRoute: '/tasks',
    pages: ['tasks', 'forms', 'grid', 'messages', 'chat', 'clock-in'],
  },
  manager: {
    id: 'manager',
    label: 'Manager',
    shortLabel: 'Mgr',
    primeDevice: 'computer',
    homeRoute: '/dashboard',
    pages: ['dashboard', 'tasks', 'assign-task', 'filtered-table', 'scheduler', 'chat'],
    allPages: ['dashboard', 'tasks', 'assign-task', 'forms', 'grid', 'filtered-table', 'scheduler', 'visualization', 'messages', 'clock-in', 'chat'],
  },
  owner: {
    id: 'owner',
    label: 'Owner',
    shortLabel: 'Owner',
    primeDevice: 'computer',
    homeRoute: '/dashboard',
    pages: ['dashboard', 'analytics', 'table-chart', 'visualization', 'chat', 'sandbox'],
    allPages: ['dashboard', 'analytics', 'tasks', 'forms', 'grid', 'filtered-table', 'scheduler', 'table-chart', 'visualization', 'messages', 'clock-in', 'chat', 'sandbox'],
  },
  dev: {
    id: 'dev',
    label: 'Dev',
    shortLabel: 'Dev',
    primeDevice: 'computer',
    homeRoute: '/dashboard',
    pages: ['dashboard', 'analytics', 'table-chart', 'visualization', 'chat', 'sandbox'],
    allPages: ['dashboard', 'analytics', 'tasks', 'forms', 'grid', 'filtered-table', 'scheduler', 'table-chart', 'visualization', 'messages', 'clock-in', 'chat', 'sandbox'],
  },
}

export interface SubNavItem {
  id: string
  label: string
}

export interface NavItem {
  id: string
  label: string
  icon: string
  route: string
  subItems?: SubNavItem[]
  subParam?: string
}

export const allNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', route: '/dashboard' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3', route: '/analytics', subParam: 'section', subItems: [
    { id: 'Overview', label: 'Overview' }, { id: 'Harvest', label: 'Harvest' }, { id: 'Chemistry', label: 'Chemistry' }, { id: 'Labor', label: 'Labor' }, { id: 'Scouting', label: 'Scouting' },
  ]},
  { id: 'tasks', label: 'Tasks', icon: 'CheckSquare', route: '/tasks' },
  { id: 'assign-task', label: 'Assign Task', icon: 'UserPlus', route: '/assign-task' },
  { id: 'forms', label: 'Forms', icon: 'ClipboardList', route: '/forms' },
  { id: 'filtered-table', label: 'Reports', icon: 'Filter', route: '/filtered-table', subParam: 'gh', subItems: [
    { id: 'All', label: 'All Greenhouses' }, { id: 'K0', label: 'GH K0' }, { id: '08', label: 'GH 08' }, { id: '01', label: 'GH 01' }, { id: 'HK', label: 'GH HK' }, { id: '07', label: 'GH 07' }, { id: '05', label: 'GH 05' }, { id: '03', label: 'GH 03' }, { id: '04', label: 'GH 04' }, { id: '06', label: 'GH 06' },
  ]},
  { id: 'grid', label: 'Schedule Grid', icon: 'Grid3x3', route: '/grid' },
  { id: 'scheduler', label: 'Scheduler', icon: 'CalendarDays', route: '/scheduler', subParam: 'dept', subItems: [
    { id: 'All', label: 'All' }, { id: 'Grow', label: 'Grow' }, { id: 'Pack', label: 'Pack' }, { id: 'IPM', label: 'IPM' }, { id: 'Maintenance', label: 'Maintenance' },
  ]},
  { id: 'table-chart', label: 'Trends', icon: 'TrendingUp', route: '/table-chart' },
  { id: 'visualization', label: 'Visualization', icon: 'Activity', route: '/visualization' },
  { id: 'messages', label: 'Messages', icon: 'MessageSquare', route: '/messages' },
  { id: 'clock-in', label: 'Clock In', icon: 'MapPin', route: '/clock-in' },
  { id: 'chat', label: 'AI Chat', icon: 'Bot', route: '/chat' },
  { id: 'sandbox', label: 'Sandbox', icon: 'Code', route: '/sandbox' },
]

export function getNavForRole(role: Role): NavItem[] {
  const config = roles[role]
  const overrides = config.navLabelOverrides || {}
  return allNavItems
    .filter(item => config.pages.includes(item.id))
    .map(item => overrides[item.id] ? { ...item, label: overrides[item.id] } : item)
}

export const navSections: { label: string; items: string[] }[] = [
  { label: 'Dashboards', items: ['dashboard', 'analytics', 'table-chart', 'visualization'] },
  { label: 'Data Entry', items: ['forms', 'grid'] },
  { label: 'Management', items: ['tasks', 'assign-task', 'scheduler', 'filtered-table'] },
  { label: 'Other', items: ['chat', 'messages', 'clock-in', 'sandbox'] },
]

export function getSectionedNavForRole(role: Role): { label: string; items: NavItem[] }[] {
  const config = roles[role]
  const pages = config.allPages || config.pages
  return navSections
    .map(section => ({
      label: section.label,
      items: allNavItems.filter(item => section.items.includes(item.id) && pages.includes(item.id)),
    }))
    .filter(section => section.items.length > 0)
}

export function hasExpandedNav(role: Role): boolean {
  return !!roles[role].allPages
}
