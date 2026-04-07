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
    pages: ['tasks', 'grow', 'messages', 'clock-in', 'chat'],
  },
  manager: {
    id: 'manager',
    label: 'Manager',
    shortLabel: 'Mgr',
    primeDevice: 'computer',
    homeRoute: '/dashboard',
    pages: ['dashboard', 'tasks', 'assign-task', 'scheduler', 'grow', 'pack', 'sales', 'food-safety', 'maintenance', 'inventory', 'hr', 'chat'],
    allPages: ['dashboard', 'tasks', 'assign-task', 'forms', 'grid', 'scheduler', 'grow', 'pack', 'sales', 'food-safety', 'maintenance', 'inventory', 'hr', 'visualization', 'messages', 'clock-in', 'chat'],
  },
  owner: {
    id: 'owner',
    label: 'Owner',
    shortLabel: 'Owner',
    primeDevice: 'computer',
    homeRoute: '/dashboard',
    pages: ['dashboard', 'analytics', 'table-chart', 'visualization', 'grow', 'pack', 'sales', 'food-safety', 'maintenance', 'inventory', 'hr', 'chat', 'sandbox'],
    allPages: ['dashboard', 'analytics', 'tasks', 'forms', 'grid', 'filtered-table', 'scheduler', 'grow', 'pack', 'sales', 'food-safety', 'maintenance', 'inventory', 'hr', 'table-chart', 'visualization', 'messages', 'clock-in', 'chat', 'sandbox'],
  },
  dev: {
    id: 'dev',
    label: 'Dev',
    shortLabel: 'Dev',
    primeDevice: 'computer',
    homeRoute: '/dashboard',
    pages: ['dashboard', 'analytics', 'table-chart', 'visualization', 'grow', 'pack', 'sales', 'food-safety', 'maintenance', 'inventory', 'hr', 'chat', 'sandbox'],
    allPages: ['dashboard', 'analytics', 'tasks', 'forms', 'grid', 'filtered-table', 'scheduler', 'grow', 'pack', 'sales', 'food-safety', 'maintenance', 'inventory', 'hr', 'table-chart', 'visualization', 'messages', 'clock-in', 'chat', 'sandbox'],
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
  { id: 'grow', label: 'Grow', icon: 'Sprout', route: '/grow', subParam: 'form', subItems: [
    { id: 'cuke-calendar', label: 'Cuke Calendar' }, { id: 'cuke-seeding', label: 'Cuke Seeding' }, { id: 'cuke-sched', label: 'Cuke Sched' }, { id: 'cuke-harvest', label: 'Cuke Harvest' }, { id: 'lettuce-seeding', label: 'Lettuce Seeding' }, { id: 'lettuce-yield', label: 'Lettuce Yield' }, { id: 'fertilizer-sched', label: 'Fertilizer Sched' }, { id: 'scouting', label: 'Scouting' }, { id: 'spraying-sched', label: 'Spraying Sched' }, { id: 'chemistry', label: 'Chemistry' },
  ]},
  { id: 'pack', label: 'Pack', icon: 'Package', route: '/pack', subParam: 'form', subItems: [
    { id: 'cuke-harvest', label: 'Cuke Harvest' }, { id: 'cuke-pack', label: 'Cuke Pack' }, { id: 'lettuce-ph', label: 'Lettuce P&H' }, { id: 'lettuce-pack', label: 'Lettuce Pack' }, { id: 'shelf-life', label: 'Shelf Life' }, { id: 'moisture', label: 'Moisture' },
  ]},
  { id: 'sales', label: 'Sales', icon: 'DollarSign', route: '/sales', subParam: 'form', subItems: [
    { id: 'pos', label: "PO's" }, { id: 'palletization', label: 'Palletization' }, { id: 'price-product-spec', label: 'Price & Product Spec' }, { id: 'customers', label: 'Customers' }, { id: 'crm', label: 'CRM' }, { id: 'markup', label: 'Markup' }, { id: 'ext-prices', label: 'Ext Prices' }, { id: 'price-grid', label: 'Price Grid' },
  ]},
  { id: 'food-safety', label: 'Food Safety', icon: 'ShieldCheck', route: '/food-safety', subParam: 'form', subItems: [
    { id: 'fsafe-logs', label: 'Fsafe Logs' }, { id: 'corrective-actions', label: 'Corrective Actions' }, { id: 'pest-activity', label: 'Pest Activity' }, { id: 'staff-training', label: 'Staff Training' }, { id: 'visitors-log', label: 'Visitors Log' }, { id: 'customer-comms', label: 'Customer Comms' },
  ]},
  { id: 'maintenance', label: 'Maintenance', icon: 'Wrench', route: '/maintenance', subParam: 'form', subItems: [
    { id: 'maint-request', label: 'Maint Request' }, { id: 'fuel-log', label: 'Fuel Log' }, { id: 'maint-inventory', label: 'Maint Inventory' }, { id: 'house-inspection', label: 'House Inspection' },
  ]},
  { id: 'inventory', label: 'Inventory', icon: 'Warehouse', route: '/inventory', subParam: 'form', subItems: [
    { id: 'wto', label: 'WTO' }, { id: 'orders', label: 'Orders' }, { id: 'budget', label: 'Budget' }, { id: 'procurement', label: 'Procurement' },
  ]},
  { id: 'hr', label: 'Human Resources', icon: 'Users', route: '/hr', subParam: 'form', subItems: [
    { id: 'register', label: 'Register' }, { id: 'scheduler', label: 'Scheduler' }, { id: 'time-off', label: 'Time Off' }, { id: 'hours-comp', label: 'Hours Comp' }, { id: 'payroll-comp', label: 'Payroll Comp' }, { id: 'payroll-comp-mgr', label: 'Payroll Comp Manager' }, { id: 'payroll-data', label: 'Payroll Data' }, { id: 'housing', label: 'Housing' }, { id: 'employee-review', label: 'Employee Review' },
  ]},
  { id: 'chat', label: 'AI Chat', icon: 'Bot', route: '/chat' },
  { id: 'sandbox', label: 'Sandbox', icon: 'Code', route: '/sandbox' },
]

export function getNavForRole(role: Role): NavItem[] {
  const config = roles[role]
  const overrides = config.navLabelOverrides || {}
  return config.pages
    .map(id => allNavItems.find(item => item.id === id))
    .filter((item): item is NavItem => !!item)
    .map(item => overrides[item.id] ? { ...item, label: overrides[item.id] } : item)
}

export const navSections: { label: string; items: string[] }[] = [
  { label: 'Dashboards', items: ['dashboard', 'analytics', 'table-chart', 'visualization'] },
  { label: 'Modules', items: ['grow', 'pack', 'sales', 'food-safety', 'maintenance', 'inventory', 'hr'] },
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
