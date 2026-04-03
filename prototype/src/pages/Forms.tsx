import FormPage from '../components/shared/FormPage'
import type { FormFieldConfig } from '../components/shared/FormPage'

const greenhouses = ['K0', '01', '03', '04', '05', '06', '07', '08', 'HK']

const fields: FormFieldConfig[] = [
  { type: 'date', label: 'Harvest Date', required: true, defaultValue: '2026-04-01' },
  { type: 'select', label: 'Greenhouse', required: true, placeholder: 'Select...', options: greenhouses.map(g => ({ value: g, label: g })) },
  { type: 'time', label: 'Clock-in Time', required: true, half: true },
  { type: 'time', label: 'Clock-out Time', required: true, half: true },
  { type: 'number', label: '# of People', required: true, placeholder: '0' },
  { type: 'number', label: 'Total Lbs', required: true, placeholder: '0' },
  { type: 'number', label: 'Grade 1 Lbs', required: true, placeholder: '0' },
]

export default function Forms() {
  return (
    <FormPage
      fields={fields}
      submitLabel="Save Entry"
      successTitle="Entry saved"
      successMessage="Harvest record submitted."
    />
  )
}
