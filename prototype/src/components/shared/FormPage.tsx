import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'
import PageShell from './PageShell'
import { InputField, SelectField, TextareaField } from './FormField'
import Button from './Button'
import SuccessState from './SuccessState'

export interface FormFieldConfig {
  type: 'text' | 'number' | 'date' | 'time' | 'select' | 'textarea'
  label: string
  required?: boolean
  placeholder?: string
  defaultValue?: string
  step?: string
  options?: { value: string; label: string }[]
  rows?: number
  half?: boolean
}

interface FormPageProps {
  fields: FormFieldConfig[]
  submitLabel?: string
  successTitle?: string
  successMessage?: string
  newEntryLabel?: string
}

export default function FormPage({
  fields,
  submitLabel = 'Save Entry',
  successTitle = 'Entry saved',
  successMessage = 'Record submitted.',
  newEntryLabel = 'New Entry',
}: FormPageProps) {
  const { device } = useApp()
  const isPhone = device === 'phone'
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <PageShell phone={isPhone} className="flex items-center justify-center h-full">
        <SuccessState
          icon={<RotateCcw size={28} className="text-green-600" />}
          title={successTitle}
          message={successMessage}
          actionLabel={newEntryLabel}
          onAction={() => setSubmitted(false)}
        />
      </PageShell>
    )
  }

  const rows: FormFieldConfig[][] = []
  let i = 0
  while (i < fields.length) {
    if (fields[i].half && i + 1 < fields.length && fields[i + 1].half) {
      rows.push([fields[i], fields[i + 1]])
      i += 2
    } else {
      rows.push([fields[i]])
      i++
    }
  }

  return (
    <PageShell phone={isPhone}>
      <div className="flex flex-col gap-4">
        {rows.map((row, ri) => {
          if (row.length === 2) {
            return (
              <div key={ri} className="grid grid-cols-2 gap-4">
                {row.map((f, fi) => <Field key={fi} config={f} />)}
              </div>
            )
          }
          return <Field key={ri} config={row[0]} />
        })}

        <Button variant="primary" size="lg" fullWidth onClick={() => setSubmitted(true)} className="mt-2">
          {submitLabel}
        </Button>
      </div>
    </PageShell>
  )
}

function Field({ config }: { config: FormFieldConfig }) {
  if (config.type === 'select') {
    return (
      <SelectField
        label={config.label}
        required={config.required}
        placeholder={config.placeholder}
        options={config.options || []}
        defaultValue={config.defaultValue}
      />
    )
  }
  if (config.type === 'textarea') {
    return (
      <TextareaField
        label={config.label}
        required={config.required}
        placeholder={config.placeholder}
        rows={config.rows}
        defaultValue={config.defaultValue}
      />
    )
  }
  return (
    <InputField
      label={config.label}
      required={config.required}
      type={config.type}
      placeholder={config.placeholder}
      defaultValue={config.defaultValue}
      step={config.step}
    />
  )
}
