const styles = {
  green: 'bg-green-50 text-green-700 border-green-200',
  red: 'bg-red-50 text-red-600 border-red-200',
  amber: 'bg-amber-50 text-amber-600 border-amber-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  slate: 'bg-slate-50 text-slate-500 border-slate-200',
}

interface BadgeProps {
  children: React.ReactNode
  color?: keyof typeof styles
  className?: string
}

export default function Badge({ children, color = 'green', className = '' }: BadgeProps) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-lg font-medium border ${styles[color]} ${className}`}>
      {children}
    </span>
  )
}
