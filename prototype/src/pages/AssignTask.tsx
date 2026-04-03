import { useState } from 'react'
import { Send } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import PageShell from '../components/shared/PageShell'
import { InputField, SelectField, TextareaField } from '../components/shared/FormField'
import Button from '../components/shared/Button'
import SuccessState from '../components/shared/SuccessState'

const employees = ['Marcus K.', 'Ana R.', 'James T.', 'David L.', 'Sarah P.', 'Lisa W.', 'Carlos M.']
const greenhouses = ['—', 'K0', '01', '03', '04', '05', '06', '07', '08', 'HK']
const priorities = ['high', 'medium', 'low'] as const

export default function AssignTask() {
  const { device } = useApp()
  const isPhone = device === 'phone'
  const [assigned, setAssigned] = useState(false)

  if (assigned) {
    return (
      <PageShell phone={isPhone} className="flex items-center justify-center h-full">
        <SuccessState
          icon={<Send size={28} className="text-green-600" />}
          title="Task assigned"
          message="The team member has been notified."
          actionLabel="Assign another"
          onAction={() => setAssigned(false)}
        />
      </PageShell>
    )
  }

  return (
    <PageShell phone={isPhone}>
      <div className="flex flex-col gap-4">
        <InputField label="Task title" placeholder="e.g. Harvest GH K0 — Cukes Block A" />

        <SelectField
          label="Assign to"
          placeholder="Select employee..."
          options={employees.map(e => ({ value: e, label: e }))}
        />

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Priority"
            options={priorities.map(p => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) }))}
          />
          <SelectField
            label="Greenhouse"
            options={greenhouses.map(gh => ({ value: gh, label: gh === '—' ? 'None' : `GH ${gh}` }))}
          />
        </div>

        <TextareaField label="Instructions" placeholder="Detailed instructions for the task..." rows={4} />

        <Button variant="primary" size="lg" fullWidth onClick={() => setAssigned(true)} className="mt-2">
          <Send size={16} />
          Assign Task
        </Button>
      </div>
    </PageShell>
  )
}
