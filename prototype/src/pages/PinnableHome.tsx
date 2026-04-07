import { useState, useRef, useEffect, useCallback } from 'react'
import { Settings, X, Plus, Check, ArrowRight, CheckSquare, TrendingUp, TrendingDown, BarChart3, ClipboardList, FlaskConical, Grid3x3, CalendarDays, MapPin, Activity, MessageSquare, Move, AlertTriangle, CheckCircle2, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'

// --- Types ---

interface Widget {
  id: string
  type: string
  label: string
  x: number
  y: number
  w: number
  h: number
}

interface WidgetCatalogItem {
  type: string
  label: string
  description: string
  icon: React.ReactNode
  defaultW: number
  defaultH: number
  category: 'shortcut' | 'chart' | 'info'
}

// --- Catalog ---

const widgetCatalog: WidgetCatalogItem[] = [
  // Shortcuts
  { type: 'shortcut-tasks', label: 'Tasks', description: 'Go to task list', icon: <CheckSquare size={18} />, defaultW: 140, defaultH: 120, category: 'shortcut' },
  { type: 'shortcut-forms', label: 'Harvest Log', description: 'Open harvest form', icon: <ClipboardList size={18} />, defaultW: 140, defaultH: 120, category: 'shortcut' },
  { type: 'shortcut-grid', label: 'Schedule Grid', description: 'Cuke schedule matrix', icon: <Grid3x3 size={18} />, defaultW: 140, defaultH: 120, category: 'shortcut' },
  { type: 'shortcut-scheduler', label: 'Scheduler', description: 'Employee shifts', icon: <CalendarDays size={18} />, defaultW: 140, defaultH: 120, category: 'shortcut' },
  { type: 'shortcut-clock', label: 'Clock In', description: 'Clock in/out', icon: <MapPin size={18} />, defaultW: 140, defaultH: 120, category: 'shortcut' },
  { type: 'shortcut-viz', label: 'Visualization', description: 'Farm overview', icon: <Activity size={18} />, defaultW: 140, defaultH: 120, category: 'shortcut' },
  { type: 'shortcut-messages', label: 'Messages', description: 'Team messages', icon: <MessageSquare size={18} />, defaultW: 140, defaultH: 120, category: 'shortcut' },
  // Charts
  { type: 'chart-harvest', label: 'Harvest Trend', description: 'Weekly harvest line chart', icon: <TrendingUp size={18} />, defaultW: 340, defaultH: 200, category: 'chart' },
  { type: 'chart-gh-yield', label: 'GH Yield', description: 'Greenhouse yield bars', icon: <BarChart3 size={18} />, defaultW: 340, defaultH: 200, category: 'chart' },
  // KPIs
  { type: 'kpi-harvest', label: 'Total Harvest', description: 'Harvest total with trend', icon: <TrendingUp size={18} />, defaultW: 160, defaultH: 130, category: 'info' },
  { type: 'kpi-grade', label: 'Grade 1 %', description: 'Grade 1 quality with trend', icon: <CheckSquare size={18} />, defaultW: 160, defaultH: 130, category: 'info' },
  { type: 'kpi-efficiency', label: 'lb/hr/person', description: 'Labor efficiency metric', icon: <TrendingDown size={18} />, defaultW: 160, defaultH: 130, category: 'info' },
  { type: 'kpi-flags', label: 'Chemistry Flags', description: 'Out-of-range readings', icon: <AlertTriangle size={18} />, defaultW: 160, defaultH: 130, category: 'info' },
  { type: 'stat-tasks', label: 'Tasks Pending', description: 'Your open task count', icon: <CheckSquare size={18} />, defaultW: 160, defaultH: 130, category: 'info' },
  { type: 'stat-readings', label: 'Readings Due', description: 'Chemistry readings left', icon: <FlaskConical size={18} />, defaultW: 160, defaultH: 130, category: 'info' },
  // Panels
  { type: 'task-summary', label: 'Today\'s Tasks', description: 'Task list with assignees', icon: <CheckSquare size={18} />, defaultW: 300, defaultH: 240, category: 'info' },
  { type: 'alerts', label: 'Alerts', description: 'Active alerts and warnings', icon: <Bell size={18} />, defaultW: 300, defaultH: 220, category: 'info' },
]

const shortcutRoutes: Record<string, string> = {
  'shortcut-tasks': '/tasks', 'shortcut-forms': '/forms',
  'shortcut-grid': '/grid', 'shortcut-scheduler': '/scheduler',
  'shortcut-clock': '/clock-in', 'shortcut-viz': '/visualization', 'shortcut-messages': '/messages',
}
const shortcutColors: Record<string, string> = {
  'shortcut-tasks': 'from-green-500 to-emerald-600', 'shortcut-forms': 'from-green-500 to-emerald-600',
  'shortcut-grid': 'from-blue-500 to-blue-600',
  'shortcut-data': 'from-amber-500 to-orange-500', 'shortcut-scheduler': 'from-blue-500 to-blue-600',
  'shortcut-clock': 'from-red-400 to-red-500', 'shortcut-viz': 'from-emerald-500 to-green-600',
  'shortcut-messages': 'from-slate-500 to-slate-600',
}

function makeDefaults(phone: boolean, canvasWidth: number): Widget[] {
  const g = 12
  if (phone) {
    const W = canvasWidth || 338
    const half = (W - g) / 2; const kh = 120
    let y = 0
    const row = (h: number) => { const cur = y; y += h + g; return cur }
    const r0 = row(kh); const r1 = row(kh); const r2 = row(170)
    const scW = (W - g * 2) / 3; const r3 = row(90); const r4 = row(200)
    return [
      { id: 'w1', type: 'kpi-harvest', label: 'Total Harvest', x: 0, y: r0, w: half, h: kh },
      { id: 'w2', type: 'kpi-grade', label: 'Grade 1 %', x: half + g, y: r0, w: half, h: kh },
      { id: 'w3', type: 'kpi-efficiency', label: 'lb/hr/person', x: 0, y: r1, w: half, h: kh },
      { id: 'w4', type: 'kpi-flags', label: 'Chemistry Flags', x: half + g, y: r1, w: half, h: kh },
      { id: 'w5', type: 'chart-harvest', label: 'Harvest Trend', x: 0, y: r2, w: W, h: 170 },
      { id: 'w6', type: 'shortcut-forms', label: 'Harvest Log', x: 0, y: r3, w: scW, h: 90 },
      { id: 'w8', type: 'shortcut-tasks', label: 'Tasks', x: scW + g, y: r3, w: scW, h: 90 },
      { id: 'w9', type: 'task-summary', label: "Today's Tasks", x: 0, y: r4, w: W, h: 200 },
    ]
  }
  // Desktop — use measured canvas width
  const W = canvasWidth || 900
  const kpiW = (W - g * 3) / 4
  const kpiH = 120
  const chartH = 280
  const halfW = (W - g) / 2

  let y = 0
  const row = (h: number) => { const cur = y; y += h + g; return cur }

  const r0 = row(kpiH)
  const r1 = row(chartH)
  const r2y = y
  const shortcutW = Math.floor((W * 0.4 - g * 2) / 3)
  const shortcutH = 120
  const leftW = (shortcutW + g) * 3 - g
  const rightX = leftW + g
  const rightW = W - rightX

  return [
    { id: 'w1', type: 'kpi-harvest', label: 'Total Harvest', x: 0, y: r0, w: kpiW, h: kpiH },
    { id: 'w2', type: 'kpi-grade', label: 'Grade 1 %', x: kpiW + g, y: r0, w: kpiW, h: kpiH },
    { id: 'w3', type: 'kpi-efficiency', label: 'lb/hr/person', x: (kpiW + g) * 2, y: r0, w: kpiW, h: kpiH },
    { id: 'w4', type: 'kpi-flags', label: 'Chemistry Flags', x: (kpiW + g) * 3, y: r0, w: kpiW, h: kpiH },
    { id: 'w5', type: 'chart-harvest', label: 'Harvest Trend', x: 0, y: r1, w: halfW, h: chartH },
    { id: 'w6', type: 'chart-gh-yield', label: 'GH Yield', x: halfW + g, y: r1, w: halfW, h: chartH },
    { id: 'w7', type: 'shortcut-forms', label: 'Harvest Log', x: 0, y: r2y, w: shortcutW, h: shortcutH },
    { id: 'w9', type: 'shortcut-grid', label: 'Schedule Grid', x: shortcutW + g, y: r2y, w: shortcutW, h: shortcutH },
    { id: 'w10', type: 'task-summary', label: "Today's Tasks", x: rightX, y: r2y, w: rightW, h: 270 },
    { id: 'w11', type: 'alerts', label: 'Alerts', x: 0, y: r2y + shortcutH + g, w: leftW, h: 270 - shortcutH - g },
  ]
}

const harvestTrend = [
  { d: 'M', v: 6200 }, { d: 'T', v: 7100 }, { d: 'W', v: 6800 }, { d: 'T', v: 7500 }, { d: 'F', v: 8200 }, { d: 'S', v: 5100 }, { d: 'Su', v: 7334 },
]
const ghYields = [
  { gh: 'K0', v: 1914 }, { gh: '01', v: 1581 }, { gh: '08', v: 1376 }, { gh: 'HK', v: 1463 }, { gh: '05', v: 908 },
]
// --- Interaction state ---
type Interaction = { kind: 'move'; id: string; ox: number; oy: number } | { kind: 'resize'; id: string; sx: number; sy: number; ow: number; oh: number }

// --- Main ---
export default function PinnableHome() {
  const { device } = useApp()
  const navigate = useNavigate()
  const isPhone = device === 'phone'
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [configuring, setConfiguring] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [, setInitialized] = useState(false)
  const iaRef = useRef<Interaction | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Measure canvas and build layout on mount and device change
  useEffect(() => {
    const measure = () => {
      if (canvasRef.current) {
        const w = canvasRef.current.clientWidth
        setWidgets(makeDefaults(isPhone, w))
        setInitialized(true)
      }
    }
    // Small delay to let the layout settle
    const t = setTimeout(measure, 50)
    return () => clearTimeout(t)
  }, [isPhone])

  // Also rebuild on window resize if not yet configured
  useEffect(() => {
    if (configuring) return
    const onResize = () => {
      if (canvasRef.current && !configuring) {
        setWidgets(makeDefaults(isPhone, canvasRef.current.clientWidth))
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isPhone, configuring])

  const canvasH = Math.max(800, ...widgets.map(w => w.y + w.h + 200))
  const GRID = isPhone ? 40 : 50

  const pos = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    const r = canvasRef.current?.getBoundingClientRect()
    if (!r) return { x: 0, y: 0 }
    const cx = 'touches' in e ? ((e as TouchEvent).touches[0] ?? (e as TouchEvent).changedTouches[0]).clientX : (e as MouseEvent).clientX
    const cy = 'touches' in e ? ((e as TouchEvent).touches[0] ?? (e as TouchEvent).changedTouches[0]).clientY : (e as MouseEvent).clientY
    return { x: cx - r.left, y: cy - r.top }
  }

  const onMove = useCallback((e: MouseEvent | TouchEvent) => {
    const ia = iaRef.current
    if (!ia) return
    const p = pos(e)
    if (ia.kind === 'move') {
      setWidgets(prev => prev.map(w => w.id === ia.id ? { ...w, x: Math.max(0, p.x - ia.ox), y: Math.max(0, p.y - ia.oy) } : w))
    } else {
      setWidgets(prev => prev.map(w => w.id === ia.id ? { ...w, w: Math.max(40, ia.ow + p.x - ia.sx), h: Math.max(30, ia.oh + p.y - ia.sy) } : w))
    }
  }, [])

  const onUp = useCallback(() => { iaRef.current = null; setActiveId(null) }, [])

  useEffect(() => {
    if (!configuring) return
    const opts = { passive: false } as AddEventListenerOptions
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, opts)
    window.addEventListener('touchend', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onUp) }
  }, [configuring, onMove, onUp])

  const startMove = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    if (!configuring) return; e.preventDefault()
    const p = pos(e); const w = widgets.find(wi => wi.id === id); if (!w) return
    iaRef.current = { kind: 'move', id, ox: p.x - w.x, oy: p.y - w.y }; setActiveId(id)
  }
  const startResize = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    if (!configuring) return; e.preventDefault(); e.stopPropagation()
    const p = pos(e); const w = widgets.find(wi => wi.id === id); if (!w) return
    iaRef.current = { kind: 'resize', id, sx: p.x, sy: p.y, ow: w.w, oh: w.h }; setActiveId(id)
  }
  const removeWidget = (id: string) => setWidgets(prev => prev.filter(w => w.id !== id))
  const addWidget = (item: WidgetCatalogItem) => {
    const maxY = widgets.length ? Math.max(...widgets.map(w => w.y + w.h)) : 0
    setWidgets(prev => [...prev, { id: 'w' + Date.now(), type: item.type, label: item.label, x: 0, y: maxY + 12, w: item.defaultW, h: item.defaultH }])
    setCatalogOpen(false)
  }

  return (
    <div className={`${isPhone ? 'p-3' : 'p-6'} relative`}>
      {/* Configuring hint */}
      {configuring && <p className="text-sm text-amber-600 mb-4">Drag to move — drag corners to resize — no limits</p>}

      {/* Floating configure bar */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {configuring && (
          <Button size="sm" onClick={() => setCatalogOpen(true)} className="shadow-lg">
            <Plus size={14} />{!isPhone && 'Add Widget'}
          </Button>
        )}
        <button
          onClick={() => { setConfiguring(c => !c); setCatalogOpen(false); iaRef.current = null; setActiveId(null) }}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium border cursor-pointer transition-all shadow-lg ${configuring ? 'bg-green-500 text-white border-green-500 shadow-green-500/25' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-slate-200/50'}`}
        >
          {configuring ? <><Check size={14} /> Done</> : <><Settings size={14} /> {!isPhone && 'Configure'}</>}
        </button>
      </div>

      {/* Canvas */}
      <div ref={canvasRef} className="relative rounded-2xl" style={{ minHeight: canvasH }}>
        {/* Grid guide lines */}
        {configuring && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-2xl overflow-hidden">
            <defs>
              <pattern id="grid" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#cbd5e1" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        )}

        {/* Widgets */}
        {widgets.map(w => (
          <div
            key={w.id}
            className={`absolute select-none ${activeId === w.id ? 'z-50' : 'z-10'}`}
            style={{ left: w.x, top: w.y, width: w.w, height: w.h }}
          >
            <div
              className={`relative w-full h-full group ${configuring ? 'cursor-move' : ''}`}
              onMouseDown={e => startMove(w.id, e)}
              onTouchStart={e => startMove(w.id, e)}
            >
              <WidgetContent widget={w} configuring={configuring} onNavigate={navigate} isPhone={isPhone} />

              {configuring && (
                <>
                  {/* Move indicator */}
                  <div className="absolute top-1.5 left-1.5 p-1 rounded-md bg-black/20 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    <Move size={12} />
                  </div>
                  {/* Remove */}
                  <button
                    onClick={e => { e.stopPropagation(); removeWidget(w.id) }}
                    onMouseDown={e => e.stopPropagation()}
                    onTouchStart={e => e.stopPropagation()}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-2 border-white cursor-pointer shadow-md z-20"
                  >
                    <X size={12} />
                  </button>
                  {/* Resize handle — bottom right corner */}
                  <div
                    onMouseDown={e => startResize(w.id, e)}
                    onTouchStart={e => startResize(w.id, e)}
                    className="absolute -bottom-1 -right-1 w-6 h-6 cursor-se-resize z-20 flex items-center justify-center"
                  >
                    <div className="w-3 h-3 border-b-2 border-r-2 border-slate-400 rounded-br-sm opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {/* Resize handle — bottom edge */}
                  <div
                    onMouseDown={e => { e.preventDefault(); e.stopPropagation(); const p = pos(e); iaRef.current = { kind: 'resize', id: w.id, sx: p.x, sy: p.y, ow: w.w, oh: w.h }; setActiveId(w.id) }}
                    className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize z-15"
                  />
                  {/* Resize handle — right edge */}
                  <div
                    onMouseDown={e => { e.preventDefault(); e.stopPropagation(); const p = pos(e); iaRef.current = { kind: 'resize', id: w.id, sx: p.x, sy: p.y, ow: w.w, oh: w.h }; setActiveId(w.id) }}
                    className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize z-15"
                  />
                  {/* Size badge */}
                  <div className={`absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold z-10 pointer-events-none ${
                    activeId === w.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  } transition-opacity ${w.type.startsWith('shortcut-') ? 'bg-black/25 text-white/80' : 'bg-slate-100 text-slate-400'}`}>
                    {Math.round(w.w)}×{Math.round(w.h)}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Catalog panel */}
      <AnimatePresence>
        {catalogOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${isPhone ? 'absolute' : 'fixed'} inset-0 bg-black/20 z-40`} onClick={() => setCatalogOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className={`${isPhone ? 'absolute' : 'fixed'} top-0 right-0 h-full ${isPhone ? 'w-full' : 'w-[380px]'} bg-white shadow-2xl z-50 flex flex-col`}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0">
                <h2 className="text-lg font-semibold text-slate-800 m-0">Add Widget</h2>
                <button onClick={() => setCatalogOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 border-none bg-transparent cursor-pointer text-slate-500"><X size={18} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                {(['shortcut', 'chart', 'info'] as const).map(cat => (
                  <div key={cat} className="mb-6">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {cat === 'shortcut' ? 'Page Shortcuts' : cat === 'chart' ? 'Charts & Graphs' : 'Stats & Info'}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {widgetCatalog.filter(w => w.category === cat).map(item => {
                        const added = widgets.some(w => w.type === item.type)
                        return (
                          <button key={item.type} onClick={() => !added && addWidget(item)} disabled={added}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${added ? 'bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed' : 'bg-white border-slate-200 cursor-pointer hover:border-green-300 hover:shadow-sm'}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cat === 'shortcut' ? 'bg-green-100 text-green-600' : cat === 'chart' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>{item.icon}</div>
                            <div className="flex-1 min-w-0"><div className="text-sm font-medium text-slate-800">{item.label}</div><div className="text-xs text-slate-400">{item.description}</div></div>
                            <div className="shrink-0">{added ? <span className="text-xs text-slate-400">Added</span> : <Plus size={16} className="text-green-500" />}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// --- Widget content ---

function WidgetContent({ widget, configuring, onNavigate, isPhone: _isPhone }: { widget: Widget; configuring: boolean; onNavigate: (p: string) => void; isPhone: boolean }) {
  const cat = widgetCatalog.find(c => c.type === widget.type)

  if (widget.type.startsWith('shortcut-')) {
    const route = shortcutRoutes[widget.type] || '/home'
    const color = shortcutColors[widget.type] || 'from-slate-500 to-slate-600'
    return (
      <button onClick={() => !configuring && onNavigate(route)}
        className={`w-full h-full rounded-2xl bg-gradient-to-br ${color} text-white border-none shadow-lg flex flex-col items-center justify-center gap-2 ${configuring ? 'cursor-move opacity-90' : 'cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all'}`}>
        <div className="opacity-90">{cat?.icon}</div>
        <div className="font-semibold text-xs">{widget.label}</div>
      </button>
    )
  }

  if (widget.type.startsWith('kpi-') || widget.type.startsWith('stat-')) {
    const kpis: Record<string, { value: string; unit: string; change: string; up: boolean; color: string; trendColor: string }> = {
      'kpi-harvest': { value: '7,334', unit: 'lbs', change: '+12%', up: true, color: 'text-slate-800', trendColor: 'text-green-600' },
      'kpi-grade': { value: '95.2', unit: '%', change: '+1.8%', up: true, color: 'text-green-600', trendColor: 'text-green-600' },
      'kpi-efficiency': { value: '142', unit: '', change: '-5%', up: false, color: 'text-slate-800', trendColor: 'text-amber-600' },
      'kpi-flags': { value: '3', unit: '', change: '+2', up: false, color: 'text-red-600', trendColor: 'text-red-600' },
      'stat-tasks': { value: '3', unit: '', change: '', up: false, color: 'text-amber-600', trendColor: 'text-amber-600' },
      'stat-readings': { value: '12', unit: '', change: '', up: false, color: 'text-purple-600', trendColor: 'text-purple-600' },
    }
    const k = kpis[widget.type] || { value: '—', unit: '', change: '', up: false, color: 'text-slate-800', trendColor: 'text-slate-500' }
    const TrendIcon = k.up ? TrendingUp : widget.type === 'kpi-flags' ? AlertTriangle : k.change ? TrendingDown : null
    return (
      <Card className={`h-full p-4 flex flex-col justify-center ${configuring ? 'cursor-move' : ''}`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-400">{widget.label}</span>
          {TrendIcon && <TrendIcon size={14} className={k.trendColor} />}
        </div>
        <div className={`text-3xl font-bold ${k.color}`}>{k.value}<span className="text-base text-slate-400 font-normal ml-1">{k.unit}</span></div>
        {k.change && <div className={`text-xs font-medium mt-1 ${k.trendColor}`}>{k.change} vs last week</div>}
      </Card>
    )
  }

  if (widget.type === 'chart-harvest') {
    return (
      <Card className={`h-full p-4 flex flex-col ${configuring ? 'cursor-move' : ''}`}>
        <div className="text-sm font-semibold text-slate-800 mb-2">Harvest Trend</div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={harvestTrend}>
              <defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} /><stop offset="100%" stopColor="#22c55e" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="d" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Area type="monotone" dataKey="v" stroke="#22c55e" fill="url(#hg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    )
  }

  if (widget.type === 'chart-gh-yield') {
    return (
      <Card className={`h-full p-4 flex flex-col ${configuring ? 'cursor-move' : ''}`}>
        <div className="text-sm font-semibold text-slate-800 mb-2">GH Yield Today</div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ghYields}>
              <XAxis dataKey="gh" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Bar dataKey="v" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    )
  }

  if (widget.type === 'task-summary') {
    const tasks = [
      { title: 'Chemistry readings — all houses', assignee: 'David L.', done: false },
      { title: 'Harvest GH K0', assignee: 'Marcus K.', done: false },
      { title: 'Scout GH 08 for aphids', assignee: 'Ana R.', done: false },
      { title: 'Seed lettuce trays — GH 04', assignee: 'Sarah P.', done: true },
    ]
    return (
      <Card className={`h-full p-4 flex flex-col ${configuring ? 'cursor-move' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-slate-800">Today's Tasks</div>
          <button onClick={() => !configuring && onNavigate('/tasks')} className="flex items-center gap-0.5 text-xs text-green-600 font-medium bg-transparent border-none cursor-pointer p-0">All <ArrowRight size={10} /></button>
        </div>
        <div className="flex flex-col gap-2.5 flex-1 overflow-hidden">
          {tasks.map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={15} className={t.done ? 'text-green-500 mt-0.5 shrink-0' : 'text-slate-300 mt-0.5 shrink-0'} />
              <div className="min-w-0">
                <div className={`text-sm truncate ${t.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{t.title}</div>
                <div className="text-xs text-slate-400">{t.assignee}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (widget.type === 'alerts') {
    return (
      <Card className={`h-full p-4 flex flex-col ${configuring ? 'cursor-move' : ''}`}>
        <div className="text-sm font-semibold text-slate-800 mb-3">Alerts</div>
        <div className="flex flex-col gap-2.5 flex-1 overflow-hidden">
          <div className="flex items-start gap-2 p-2.5 bg-red-50 rounded-xl border border-red-200">
            <AlertTriangle size={13} className="text-red-500 mt-0.5 shrink-0" />
            <div className="text-xs text-red-700">GH K0 drain EC at 2.8 — above 2.3 threshold</div>
          </div>
          <div className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200">
            <AlertTriangle size={13} className="text-amber-500 mt-0.5 shrink-0" />
            <div className="text-xs text-amber-700">GH 05 lb/hr below target (67 vs 120)</div>
          </div>
          <div className="flex items-start gap-2 p-2.5 bg-green-50 rounded-xl border border-green-200">
            <CheckCircle2 size={13} className="text-green-500 mt-0.5 shrink-0" />
            <div className="text-xs text-green-700">All scouting reports submitted on time</div>
          </div>
        </div>
      </Card>
    )
  }

  return <Card className={`h-full p-4 flex items-center justify-center text-sm text-slate-400 ${configuring ? 'cursor-move' : ''}`}>{widget.label}</Card>
}
