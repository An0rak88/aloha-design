import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

interface SlidePanelProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  onSave?: () => void
}

export default function SlidePanel({ open, onClose, title, children, onSave }: SlidePanelProps) {
  const { device } = useApp()
  const isPhone = device === 'phone'

  if (isPhone) {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute inset-0 bg-white z-30 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 shrink-0">
              <button onClick={onClose} className="flex items-center gap-1 text-green-600 font-medium text-sm border-none bg-transparent cursor-pointer p-0">
                <ChevronLeft size={18} />
                Back
              </button>
              <h2 className="text-base font-semibold text-slate-800 m-0">{title}</h2>
              <button
                onClick={onSave || onClose}
                className="px-3 py-1.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 border-none cursor-pointer"
              >
                Save
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[480px] max-w-[90vw] bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer text-slate-500">
                  <X size={18} />
                </button>
                <h2 className="text-lg font-semibold text-slate-800 m-0">{title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="px-4 py-2 rounded-2xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer">
                  Cancel
                </button>
                <button
                  onClick={onSave || onClose}
                  className="px-4 py-2 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 border-none cursor-pointer hover:shadow-xl transition-shadow"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
