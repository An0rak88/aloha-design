import { useState } from 'react'
import { Droplets, Thermometer, Zap, AlertTriangle } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import PageShell from '../components/shared/PageShell'
import Card from '../components/shared/Card'

interface GHStatus {
  id: string
  ec: number
  ph: number
  temp: number
  drainPct: number
  status: 'good' | 'warning' | 'alert'
}

const ghStatuses: GHStatus[] = [
  { id: 'K0', ec: 2.8, ph: 5.6, temp: 72, drainPct: 28, status: 'alert' },
  { id: '08', ec: 2.1, ph: 5.8, temp: 70, drainPct: 22, status: 'good' },
  { id: '01', ec: 2.3, ph: 5.7, temp: 71, drainPct: 25, status: 'good' },
  { id: 'HK', ec: 2.4, ph: 5.5, temp: 74, drainPct: 18, status: 'warning' },
  { id: '07', ec: 2.0, ph: 5.9, temp: 69, drainPct: 24, status: 'good' },
  { id: 'WA', ec: 2.2, ph: 5.7, temp: 71, drainPct: 21, status: 'good' },
  { id: '04', ec: 2.5, ph: 5.4, temp: 73, drainPct: 19, status: 'warning' },
  { id: '02', ec: 2.1, ph: 5.8, temp: 70, drainPct: 23, status: 'good' },
  { id: '06', ec: 2.0, ph: 5.9, temp: 68, drainPct: 26, status: 'good' },
  { id: 'H5', ec: 2.2, ph: 5.7, temp: 71, drainPct: 22, status: 'good' },
  { id: '05', ec: 2.3, ph: 5.6, temp: 72, drainPct: 20, status: 'good' },
  { id: '03', ec: 2.1, ph: 5.8, temp: 69, drainPct: 24, status: 'good' },
]

const statusColors = {
  good: 'from-green-400 to-emerald-500',
  warning: 'from-amber-400 to-orange-500',
  alert: 'from-red-400 to-red-500',
}

const statusBorders = {
  good: 'border-green-300 shadow-green-500/20',
  warning: 'border-amber-300 shadow-amber-500/20',
  alert: 'border-red-300 shadow-red-500/20 animate-pulse',
}

export default function Visualization() {
  const { device } = useApp()
  const [selectedGH, setSelectedGH] = useState<GHStatus | null>(null)
  const isPhone = device === 'phone'

  if (isPhone) {
    return (
      <PageShell phone>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {ghStatuses.map(gh => (
            <button
              key={gh.id}
              onClick={() => setSelectedGH(gh)}
              className={`p-3 rounded-2xl border-2 bg-white cursor-pointer transition-all ${statusBorders[gh.status]} ${
                selectedGH?.id === gh.id ? 'ring-2 ring-green-500 ring-offset-2' : ''
              }`}
            >
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${statusColors[gh.status]} mx-auto mb-1`} />
              <div className="text-xs font-bold text-slate-800 text-center">GH {gh.id}</div>
              <div className="text-[10px] text-slate-400 text-center">EC {gh.ec}</div>
            </button>
          ))}
        </div>

        {selectedGH && <GHDetail gh={selectedGH} />}
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="grid grid-cols-3 gap-6">
        {/* Greenhouse grid */}
        <div className="col-span-2">
          <div className="grid grid-cols-4 gap-3">
            {ghStatuses.map(gh => (
              <button
                key={gh.id}
                onClick={() => setSelectedGH(gh)}
                className={`p-4 rounded-2xl border-2 bg-white cursor-pointer transition-all hover:shadow-lg ${statusBorders[gh.status]} ${
                  selectedGH?.id === gh.id ? 'ring-2 ring-green-500 ring-offset-2' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${statusColors[gh.status]} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-xs">{gh.id}</span>
                  </div>
                  {gh.status === 'alert' && <AlertTriangle size={14} className="text-red-500" />}
                  {gh.status === 'warning' && <AlertTriangle size={14} className="text-amber-500" />}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Zap size={10} />
                    EC {gh.ec}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Droplets size={10} />
                    pH {gh.ph}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Thermometer size={10} />
                    {gh.temp}°F
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Droplets size={10} />
                    {gh.drainPct}%
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div>
          {selectedGH ? (
            <GHDetail gh={selectedGH} />
          ) : (
            <Card className="p-6 text-center">
              <div className="text-slate-400 mb-2">Select a greenhouse</div>
              <p className="text-sm text-slate-400">Click on a greenhouse to view detailed readings</p>
            </Card>
          )}

          {/* Legend */}
          <Card className="p-4 mt-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Status Legend</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500" />
                <span className="text-sm text-slate-600">Good — all readings within range</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500" />
                <span className="text-sm text-slate-600">Warning — one or more readings near limits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-lg bg-gradient-to-br from-red-400 to-red-500" />
                <span className="text-sm text-slate-600">Alert — readings out of range</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}

function GHDetail({ gh }: { gh: GHStatus }) {
  const metrics = [
    { label: 'Drain EC', value: gh.ec.toFixed(1), target: '2.0–2.5', unit: '', ok: gh.ec <= 2.5 },
    { label: 'pH', value: gh.ph.toFixed(1), target: '5.5–6.0', unit: '', ok: gh.ph >= 5.5 && gh.ph <= 6.0 },
    { label: 'Temperature', value: gh.temp.toString(), target: '65–75', unit: '°F', ok: gh.temp >= 65 && gh.temp <= 75 },
    { label: 'Drain %', value: gh.drainPct.toString(), target: '20–30', unit: '%', ok: gh.drainPct >= 20 && gh.drainPct <= 30 },
  ]

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${statusColors[gh.status]} flex items-center justify-center shadow-lg`}>
          <span className="text-white font-bold text-sm">{gh.id}</span>
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 m-0">Greenhouse {gh.id}</h3>
          <span className={`text-xs font-medium ${gh.status === 'good' ? 'text-green-600' : gh.status === 'warning' ? 'text-amber-600' : 'text-red-600'}`}>
            {gh.status.charAt(0).toUpperCase() + gh.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {metrics.map(m => (
          <div key={m.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-none">
            <div>
              <div className="text-sm font-medium text-slate-700">{m.label}</div>
              <div className="text-xs text-slate-400">Target: {m.target}{m.unit}</div>
            </div>
            <div className={`text-lg font-bold ${m.ok ? 'text-green-600' : 'text-red-600'}`}>
              {m.value}{m.unit}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
