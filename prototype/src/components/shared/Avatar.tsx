interface AvatarProps {
  initials: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'w-7 h-7 text-[11px]',
  md: 'w-9 h-9 text-sm',
  lg: 'w-10 h-10 text-base',
}

export default function Avatar({ initials, size = 'md', className = '' }: AvatarProps) {
  return (
    <div className={`rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-medium cursor-pointer ${sizes[size]} ${className}`}>
      {initials}
    </div>
  )
}
