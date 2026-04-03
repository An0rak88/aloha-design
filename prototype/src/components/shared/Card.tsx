interface CardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  active?: boolean
}

export default function Card({ children, onClick, className = '', active }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border transition-all ${
        active ? 'border-green-300 shadow-md' : 'border-slate-200'
      } ${onClick ? 'cursor-pointer hover:border-green-300 hover:shadow-md' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
