import { Code, Plus, Layout, Table, BarChart3, FileText } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import PageShell from '../components/shared/PageShell'
import Card from '../components/shared/Card'

const templates = [
  { id: '1', icon: Layout, label: 'Custom Dashboard', desc: 'Build a personal KPI view' },
  { id: '2', icon: Table, label: 'Data View', desc: 'Create a filtered data table' },
  { id: '3', icon: BarChart3, label: 'Chart Builder', desc: 'Visualize your data' },
  { id: '4', icon: FileText, label: 'Input Form', desc: 'Design a custom entry form' },
]

const myProjects = [
  { id: '1', name: 'My Harvest Tracker', updated: '2 days ago', type: 'Dashboard' },
  { id: '2', name: 'GH Chemistry Alert View', updated: '1 week ago', type: 'Data View' },
]

export default function Sandbox() {
  const { device } = useApp()
  const isPhone = device === 'phone'

  if (isPhone) {
    return (
      <PageShell phone>
        <div className="flex flex-col gap-2">
          {templates.map(t => (
            <Card key={t.id} className="p-4 cursor-pointer">
              <div className="flex items-center gap-3 text-left w-full">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <t.icon size={18} className="text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800">{t.label}</div>
                  <div className="text-xs text-slate-400">{t.desc}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="flex items-center justify-end mb-6">
        <button className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25 border-none cursor-pointer">
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Templates */}
        <div className="col-span-2">
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Start from a template</h3>
          <div className="grid grid-cols-2 gap-3">
            {templates.map(t => (
              <Card key={t.id} onClick={() => {}} className="p-5">
                <div className="flex items-center gap-4 text-left w-full">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                    <t.icon size={22} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{t.label}</div>
                    <div className="text-sm text-slate-400 mt-0.5">{t.desc}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* My projects */}
        <div>
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">My Projects</h3>
          <div className="flex flex-col gap-3">
            {myProjects.map(p => (
              <Card key={p.id} onClick={() => {}} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code size={14} className="text-purple-500" />
                  <span className="font-medium text-slate-800 text-sm">{p.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{p.type}</span>
                  <span>{p.updated}</span>
                </div>
              </Card>
            ))}
            <div className="bg-slate-50 rounded-2xl p-4 border-2 border-dashed border-slate-200 text-center cursor-pointer hover:border-purple-300 transition-colors">
              <Plus size={18} className="text-slate-400 mx-auto mb-1" />
              <span className="text-sm text-slate-400">New Project</span>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
