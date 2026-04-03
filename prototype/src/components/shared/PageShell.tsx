interface PageShellProps {
  children: React.ReactNode
  phone?: boolean
  className?: string
}

export default function PageShell({ children, phone, className = '' }: PageShellProps) {
  return (
    <div className={`${phone ? 'p-4' : 'p-6'} ${className}`}>
      {children}
    </div>
  )
}
