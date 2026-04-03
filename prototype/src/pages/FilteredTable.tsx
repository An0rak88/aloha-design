import { ArrowUpDown, Download, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import PageShell from '../components/shared/PageShell'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'

interface HarvestRow {
  id: string
  dateGH: string
  date: string
  gh: string
  clockIn: string
  clockOut: string
  hours: string
  people: number
  lbs: number
  g1: number
  g1pct: number
  lbPerHr: number
  reporter: string
}

const data: HarvestRow[] = [
  { id: '1', dateGH: '04/01 - K0', date: '4/1/2026', gh: 'K0', clockIn: '6:30 AM', clockOut: '8:10 AM', hours: '1.67', people: 7, lbs: 1914, g1: 1885, g1pct: 98, lbPerHr: 164, reporter: 'dalsto@hawaiifarming.com' },
  { id: '2', dateGH: '04/01 - 01', date: '4/1/2026', gh: '01', clockIn: '8:12 AM', clockOut: '9:44 AM', hours: '1.53', people: 7, lbs: 1581, g1: 1517, g1pct: 96, lbPerHr: 148, reporter: 'william@hawaiifarming.com' },
  { id: '3', dateGH: '04/01 - 08', date: '4/1/2026', gh: '08', clockIn: '9:44 AM', clockOut: '10:12 AM', hours: '1.85', people: 3, lbs: 1376, g1: 1358, g1pct: 99, lbPerHr: 248, reporter: 'dalsto@hawaiifarming.com' },
  { id: '4', dateGH: '04/01 - 03', date: '4/1/2026', gh: '03', clockIn: '8:21 AM', clockOut: '10:12 AM', hours: '1.85', people: 3, lbs: 1376, g1: 1358, g1pct: 99, lbPerHr: 245, reporter: 'william@hawaiifarming.com' },
  { id: '5', dateGH: '04/01 - HK', date: '4/1/2026', gh: 'HK', clockIn: '9:46 AM', clockOut: '11:30 AM', hours: '1.73', people: 9, lbs: 1463, g1: 1329, g1pct: 91, lbPerHr: 94, reporter: 'dalsto@hawaiifarming.com' },
  { id: '6', dateGH: '04/01 - 05', date: '4/1/2026', gh: '05', clockIn: '11:32 AM', clockOut: '1:29 PM', hours: '1.95', people: 7, lbs: 908, g1: 829, g1pct: 91, lbPerHr: 67, reporter: 'dalsto@hawaiifarming.com' },
]

const greenhouses = ['All', 'K0', '08', '01', 'HK', '07', '05', '03', '04', '06']

export default function FilteredTable() {
  const { device } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedGH = searchParams.get('gh') || 'All'
  const setSelectedGH = (gh: string) => gh === 'All' ? setSearchParams({}) : setSearchParams({ gh })
  const isPhone = device === 'phone'

  const filtered = selectedGH === 'All' ? data : data.filter(r => r.gh === selectedGH)

  if (isPhone) {
    return (
      <PageShell phone>
        <div className="flex gap-2 overflow-x-auto pb-3 mb-3">
          {greenhouses.slice(0, 6).map(gh => (
            <button
              key={gh}
              onClick={() => setSelectedGH(gh)}
              className={`px-3 py-1.5 rounded-2xl text-sm font-medium whitespace-nowrap border-none cursor-pointer ${
                selectedGH === gh ? 'bg-green-100 text-green-700' : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              {gh === 'All' ? 'All' : `GH ${gh}`}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {filtered.map(row => (
            <Card key={row.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-800">{row.dateGH}</span>
                <span className={`font-bold ${row.g1pct >= 95 ? 'text-green-600' : 'text-amber-600'}`}>{row.g1pct}%</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>{row.lbs.toLocaleString()} lbs</span>
                <span>{row.people} people</span>
                <span>{row.lbPerHr} lb/hr</span>
              </div>
            </Card>
          ))}
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell className="h-full overflow-auto">
        <div className="flex items-center justify-end mb-5">
          <Button variant="secondary" size="md">
            <Download size={14} />
            Export
          </Button>
        </div>

        {/* Date group header */}
        <div className="bg-green-600 text-white px-4 py-2 rounded-t-2xl text-sm font-semibold">
          4/1/2026 <span className="text-green-200 text-xs ml-2">Today</span>
        </div>

        <div className="bg-white rounded-b-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {['Date - GH', 'Clock In', 'Clock Out', 'Hours', '# People', 'Lbs', 'G1', 'G1 %', 'lb/hr/person', 'Reporter'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-500 font-medium text-xs whitespace-nowrap">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                      {h}
                      <ArrowUpDown size={10} />
                    </div>
                  </th>
                ))}
                <th className="w-6" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-green-50 cursor-pointer transition-colors">
                  <td className="px-4 py-4 font-semibold text-slate-800">{row.dateGH}</td>
                  <td className="px-4 py-4 text-slate-600">{row.clockIn}</td>
                  <td className="px-4 py-4 text-slate-600">{row.clockOut}</td>
                  <td className="px-4 py-4 text-slate-600">{row.hours}</td>
                  <td className="px-4 py-4 text-slate-600">{row.people}</td>
                  <td className="px-4 py-4 font-semibold text-slate-800">{row.lbs.toLocaleString()}</td>
                  <td className="px-4 py-4 text-slate-700">{row.g1.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className={`font-semibold ${row.g1pct >= 95 ? 'text-green-600' : 'text-amber-600'}`}>{row.g1pct}%</span>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{row.lbPerHr}</td>
                  <td className="px-4 py-4 text-xs text-slate-400 truncate max-w-[160px]">{row.reporter}</td>
                  <td className="px-4 py-4"><ChevronRight size={14} className="text-slate-300" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </PageShell>
  )
}
