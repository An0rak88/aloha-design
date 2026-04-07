import FormPage from '../components/shared/FormPage'

import type { FormFieldConfig } from '../components/shared/FormPage'

const employees = ['Marcus K.', 'Ana R.', 'James T.', 'David L.', 'Sarah P.', 'Lisa W.', 'Carlos M.']
const greenhouses = ['—', 'K0', '01', '03', '04', '05', '06', '07', '08', 'HK']

const fields: FormFieldConfig[] = [
  { type: 'text', label: 'Task title', placeholder: 'e.g. Harvest GH K0 — Cukes Block A' },
  { type: 'select', label: 'Assign to', placeholder: 'Select employee...', options: employees.map(e => ({ value: e, label: e })) },
  { type: 'select', label: 'Priority', half: true, options: [{ value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }] },
  { type: 'select', label: 'Greenhouse', half: true, options: greenhouses.map(g => ({ value: g, label: g === '—' ? 'None' : `GH ${g}` })) },
  { type: 'textarea', label: 'Instructions', placeholder: 'Detailed instructions for the task...', rows: 4 },
]

export default function AssignTask() {
  return (
    <FormPage
      fields={fields}
      submitLabel="Assign Task"
      successTitle="Task assigned"
      successMessage="The team member has been notified."
      newEntryLabel="Assign another"
    />
  )
}
