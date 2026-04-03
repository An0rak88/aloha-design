import { useApp } from '../contexts/AppContext'
import PageShell from '../components/shared/PageShell'

export default function ModulePlaceholder({ name }: { name: string }) {
  const { device } = useApp()
  return (
    <PageShell phone={device === 'phone'} className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="text-sm text-slate-400">No forms added yet</div>
      </div>
    </PageShell>
  )
}
