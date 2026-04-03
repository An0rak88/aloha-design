interface ButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  disabled?: boolean
}

const base = 'inline-flex items-center justify-center gap-2 font-medium border-none cursor-pointer transition-all'

const variants = {
  primary: 'text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 hover:shadow-xl',
  secondary: 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50',
  ghost: 'text-slate-500 bg-transparent hover:bg-slate-100',
}

const sizes = {
  sm: 'px-3 py-1.5 rounded-xl text-xs',
  md: 'px-4 py-2.5 rounded-2xl text-sm',
  lg: 'px-5 py-3 rounded-2xl text-sm',
}

export default function Button({ children, onClick, variant = 'primary', size = 'md', fullWidth, className = '', disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${variant === 'secondary' ? 'border border-slate-200' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
