import { useApp } from '../contexts/AppContext'

const greenhouses = ['K0', '08', '01', 'HK', '07', 'WA', '04', '02', '06', 'H5', '05', '03']
const dates = ['04/01', '03/31', '03/30', '03/29', '03/28']

type CellState = 'seeded' | 'harvesting' | 'rest' | null

const schedule: Record<string, Record<string, CellState>> = {
  '04/01': { K0: 'harvesting', '08': 'harvesting', '01': 'harvesting', HK: 'harvesting', '07': 'seeded', WA: 'rest', '04': 'seeded', '02': 'rest', '06': 'harvesting', H5: 'harvesting', '05': 'rest', '03': 'seeded' },
  '03/31': { K0: 'harvesting', '08': 'harvesting', '01': 'harvesting', HK: 'seeded', '07': 'seeded', WA: 'rest', '04': 'seeded', '02': 'rest', '06': 'harvesting', H5: 'rest', '05': 'rest', '03': 'seeded' },
  '03/30': { K0: 'harvesting', '08': 'seeded', '01': 'harvesting', HK: 'seeded', '07': 'rest', WA: 'rest', '04': 'seeded', '02': 'rest', '06': 'harvesting', H5: 'rest', '05': 'seeded', '03': 'seeded' },
  '03/29': { K0: 'seeded', '08': 'seeded', '01': 'harvesting', HK: 'seeded', '07': 'rest', WA: 'seeded', '04': 'rest', '02': 'rest', '06': 'seeded', H5: 'rest', '05': 'seeded', '03': 'rest' },
  '03/28': { K0: 'seeded', '08': 'seeded', '01': 'seeded', HK: 'rest', '07': 'rest', WA: 'seeded', '04': 'rest', '02': 'seeded', '06': 'seeded', H5: 'rest', '05': 'seeded', '03': 'rest' },
}

const cellStyles: Record<string, string> = {
  seeded: 'bg-green-100 border-green-300 text-green-700',
  harvesting: 'bg-amber-100 border-amber-300 text-amber-700',
  rest: 'bg-slate-100 border-slate-200 text-slate-400',
}

const cellLabels: Record<string, string> = {
  seeded: 'S',
  harvesting: 'H',
  rest: '—',
}

export default function GridMatrix() {
  const { device } = useApp()
  const isPhone = device === 'phone'

  if (isPhone) {
    return (
      <div className="p-4">
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="min-w-[600px]">
            <GridTable compact />
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-green-100 border border-green-300" />
            <span className="text-xs text-slate-500">Seeded</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300" />
            <span className="text-xs text-slate-500">Harvesting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200" />
            <span className="text-xs text-slate-500">Rest</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-end mb-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-green-100 border border-green-300" />
            <span className="text-xs text-slate-500">Seeded</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300" />
            <span className="text-xs text-slate-500">Harvesting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200" />
            <span className="text-xs text-slate-500">Rest</span>
          </div>
        </div>
      </div>
      <GridTable compact={false} />
    </div>
  )
}

function GridTable({ compact }: { compact: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className={`text-left text-slate-500 font-medium sticky left-0 bg-white z-10 ${compact ? 'px-2 py-2 text-xs' : 'px-4 py-3 text-xs'}`}>Date</th>
            {greenhouses.map(gh => (
              <th key={gh} className={`text-center text-slate-500 font-bold ${compact ? 'px-1 py-2 text-xs' : 'px-3 py-3 text-xs'}`}>{gh}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map(date => (
            <tr key={date} className="border-b border-slate-100">
              <td className={`font-medium text-slate-700 sticky left-0 bg-white z-10 ${compact ? 'px-2 py-2 text-xs' : 'px-4 py-4 text-sm'}`}>{date}</td>
              {greenhouses.map(gh => {
                const state = schedule[date]?.[gh]
                return (
                  <td key={gh} className={`text-center ${compact ? 'px-1 py-2' : 'px-3 py-4'}`}>
                    {state && (
                      <div className={`inline-flex items-center justify-center rounded-lg border font-bold cursor-pointer hover:opacity-80 transition-opacity ${cellStyles[state]} ${compact ? 'w-6 h-6 text-[10px]' : 'w-9 h-9 text-xs'}`}>
                        {cellLabels[state]}
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
