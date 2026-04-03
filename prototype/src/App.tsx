import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './contexts/AppContext'
import { roles } from './data/roles'
import AppLayout from './components/layout/AppLayout'
import TaskList from './pages/TaskList'
import Messages from './pages/Messages'
import Forms from './pages/Forms'
import GridMatrix from './pages/GridMatrix'
import FilteredTable from './pages/FilteredTable'
import Scheduler from './pages/Scheduler'
import DashboardAnalytical from './pages/DashboardAnalytical'
import TableChartCombo from './pages/TableChartCombo'
import Visualization from './pages/Visualization'
import PinnableHome from './pages/PinnableHome'
import Chat from './pages/Chat'
import Sandbox from './pages/Sandbox'
import ClockIn from './pages/ClockIn'
import AssignTask from './pages/AssignTask'

function RoleGuard({ page, children }: { page: string; children: React.ReactNode }) {
  const { role } = useApp()
  const config = roles[role]
  const accessiblePages = config.allPages || config.pages
  if (!accessiblePages.includes(page)) {
    return <Navigate to={config.homeRoute} replace />
  }
  return <>{children}</>
}

export default function App() {
  const { role } = useApp()

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<RoleGuard page="dashboard"><PinnableHome /></RoleGuard>} />
        <Route path="/analytics" element={<RoleGuard page="analytics"><DashboardAnalytical /></RoleGuard>} />
        <Route path="/tasks" element={<RoleGuard page="tasks"><TaskList /></RoleGuard>} />
        <Route path="/assign-task" element={<RoleGuard page="assign-task"><AssignTask /></RoleGuard>} />
        <Route path="/forms" element={<RoleGuard page="forms"><Forms /></RoleGuard>} />
        <Route path="/grid" element={<RoleGuard page="grid"><GridMatrix /></RoleGuard>} />
        <Route path="/filtered-table" element={<RoleGuard page="filtered-table"><FilteredTable /></RoleGuard>} />
        <Route path="/scheduler" element={<RoleGuard page="scheduler"><Scheduler /></RoleGuard>} />
        <Route path="/table-chart" element={<RoleGuard page="table-chart"><TableChartCombo /></RoleGuard>} />
        <Route path="/visualization" element={<RoleGuard page="visualization"><Visualization /></RoleGuard>} />
        <Route path="/messages" element={<RoleGuard page="messages"><Messages /></RoleGuard>} />
        <Route path="/clock-in" element={<RoleGuard page="clock-in"><ClockIn /></RoleGuard>} />
        <Route path="/chat" element={<RoleGuard page="chat"><Chat /></RoleGuard>} />
        <Route path="/sandbox" element={<RoleGuard page="sandbox"><Sandbox /></RoleGuard>} />
        <Route path="*" element={<Navigate to={roles[role].homeRoute} replace />} />
      </Route>
    </Routes>
  )
}
