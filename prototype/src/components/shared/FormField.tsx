interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
}

interface InputProps {
  label: string
  required?: boolean
  type?: string
  placeholder?: string
  defaultValue?: string
  step?: string
}

interface SelectProps {
  label: string
  required?: boolean
  options: { value: string; label: string }[]
  defaultValue?: string
  placeholder?: string
}

interface TextareaProps {
  label: string
  required?: boolean
  placeholder?: string
  rows?: number
  defaultValue?: string
}

const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100'

export function FormField({ label, required, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}{required && ' *'}</label>
      {children}
    </div>
  )
}

export function InputField({ label, required, type = 'text', placeholder, defaultValue, step }: InputProps) {
  return (
    <FormField label={label} required={required}>
      <input type={type} placeholder={placeholder} defaultValue={defaultValue} step={step} className={inputClass} />
    </FormField>
  )
}

export function SelectField({ label, required, options, defaultValue, placeholder }: SelectProps) {
  return (
    <FormField label={label} required={required}>
      <select defaultValue={defaultValue} className={`${inputClass} cursor-pointer`}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </FormField>
  )
}

export function TextareaField({ label, required, placeholder, rows = 4, defaultValue }: TextareaProps) {
  return (
    <FormField label={label} required={required}>
      <textarea rows={rows} placeholder={placeholder} defaultValue={defaultValue} className={`${inputClass} resize-none`} />
    </FormField>
  )
}
