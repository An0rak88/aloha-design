import { Plus } from 'lucide-react'

interface FABProps {
  onClick: () => void
  icon?: React.ReactNode
  phone?: boolean
}

export default function FAB({ onClick, icon, phone }: FABProps) {
  return (
    <div className={`sticky ${phone ? 'bottom-4' : 'bottom-6'} flex justify-end pointer-events-none z-30`}>
      <button
        onClick={onClick}
        className="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none cursor-pointer shadow-xl shadow-green-500/30 flex items-center justify-center hover:shadow-2xl transition-shadow"
      >
        {icon || <Plus size={24} />}
      </button>
    </div>
  )
}
