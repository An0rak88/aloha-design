import { type ReactNode } from 'react'

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200 p-8 pb-28">
      <div className="w-[390px] h-[844px] bg-black rounded-[50px] p-3 shadow-2xl relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-black rounded-b-2xl z-20" />
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col relative">
          {/* Status bar */}
          <div className="h-[34px] bg-white flex items-center justify-between px-8 pt-1 shrink-0 z-10">
            <span className="text-[11px] font-semibold text-slate-800">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex items-end gap-0.5">
                <div className="w-[3px] h-[4px] bg-slate-800 rounded-sm" />
                <div className="w-[3px] h-[6px] bg-slate-800 rounded-sm" />
                <div className="w-[3px] h-[8px] bg-slate-800 rounded-sm" />
                <div className="w-[3px] h-[10px] bg-slate-300 rounded-sm" />
              </div>
              <span className="text-[11px] font-semibold text-slate-800 ml-1">100%</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
