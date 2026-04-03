import Button from './Button'

interface SuccessStateProps {
  icon: React.ReactNode
  title: string
  message: string
  actionLabel: string
  onAction: () => void
}

export default function SuccessState({ icon, title, message, actionLabel, onAction }: SuccessStateProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
        <p className="text-sm text-slate-500 mb-5">{message}</p>
        <Button onClick={onAction}>{actionLabel}</Button>
      </div>
    </div>
  )
}
