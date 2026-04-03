import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import PageShell from '../components/shared/PageShell'
import { InputField, SelectField } from '../components/shared/FormField'
import Button from '../components/shared/Button'
import SuccessState from '../components/shared/SuccessState'

export default function Forms() {
  const { device } = useApp()
  const isPhone = device === 'phone'
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <PageShell phone={isPhone} className="flex items-center justify-center h-full">
        <SuccessState
          icon={<RotateCcw size={28} className="text-green-600" />}
          title="Entry saved"
          message="Harvest record submitted."
          actionLabel="New Entry"
          onAction={() => setSubmitted(false)}
        />
      </PageShell>
    )
  }

  return (
    <PageShell phone={isPhone}>
      <div className="flex flex-col gap-4">
        <InputField label="Harvest Date" required type="date" defaultValue="2026-04-01" />
        <SelectField
          label="Greenhouse"
          required
          placeholder="Select..."
          options={[
            { value: 'K0', label: 'K0' },
            { value: '01', label: '01' },
            { value: '03', label: '03' },
            { value: '04', label: '04' },
            { value: '05', label: '05' },
            { value: '06', label: '06' },
            { value: '07', label: '07' },
            { value: '08', label: '08' },
            { value: 'HK', label: 'HK' },
          ]}
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Clock-in Time" required type="time" />
          <InputField label="Clock-out Time" required type="time" />
        </div>
        <InputField label="# of People" required type="number" placeholder="0" />
        <InputField label="Total Lbs" required type="number" placeholder="0" />
        <InputField label="Grade 1 Lbs" required type="number" placeholder="0" />

        <Button variant="primary" size="lg" fullWidth onClick={() => setSubmitted(true)} className="mt-2">
          Save Entry
        </Button>
      </div>
    </PageShell>
  )
}
