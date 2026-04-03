import { useSearchParams } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import PageShell from '../components/shared/PageShell'
import FormPage from '../components/shared/FormPage'
import { moduleForms } from '../data/moduleForms'

export default function ModulePlaceholder({ name }: { name: string }) {
  const { device } = useApp()
  const [searchParams] = useSearchParams()
  const formId = searchParams.get('form')
  const nameToKey: Record<string, string> = {
    'Grow': 'grow', 'Pack': 'pack', 'Sales': 'sales',
    'Food Safety': 'food-safety', 'Maintenance': 'maintenance',
    'Inventory': 'inventory', 'Human Resources': 'hr',
  }
  const moduleKey = nameToKey[name] || name.toLowerCase()
  const forms = moduleForms[moduleKey]

  if (formId && forms?.[formId]) {
    const form = forms[formId]
    return (
      <FormPage
        fields={form.fields}
        submitLabel={form.submitLabel}
        successTitle="Entry saved"
        successMessage={form.successMessage}
      />
    )
  }

  return (
    <PageShell phone={device === 'phone'} className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="text-sm text-slate-400">Select a form from the menu</div>
      </div>
    </PageShell>
  )
}
