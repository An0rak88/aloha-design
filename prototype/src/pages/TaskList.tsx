import { useState } from 'react'
import { CheckCircle2, Circle, ChevronDown, Bot, MessageSquare, PartyPopper, Hand } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import PageShell from '../components/shared/PageShell'
import Card from '../components/shared/Card'
import Badge from '../components/shared/Badge'
import Button from '../components/shared/Button'
import Tabs from '../components/shared/Tabs'
import SuccessState from '../components/shared/SuccessState'

interface Task {
  id: string
  title: string
  assignee: string
  priority: 'high' | 'medium' | 'low'
  greenhouse?: string
  instructions?: string
}

const initialTasks: Task[] = [
  { id: '1', title: 'Harvest GH K0 — Cukes Block A', assignee: 'Marcus K.', priority: 'high', greenhouse: 'K0', instructions: 'Start at Row 1, work east to west. Use blue bins only — gray bins are for Grade 2. Target: 1,900 lbs minimum. Clock in/out in the Harvest Log form when done. If you see powdery mildew, flag it in scouting before continuing.' },
  { id: '2', title: 'Scout GH 08 for aphids', assignee: 'Ana R.', priority: 'high', greenhouse: '08', instructions: 'Check undersides of leaves on Rows 6–12 (where aphids were spotted last week). Use the IPM scouting form to log counts per plant. If >5 aphids per leaf, escalate to Eric for spray authorization. Take photos of any whitefly you see too.' },
  { id: '3', title: 'Replace drip emitters Row 12', assignee: 'James T.', priority: 'medium', greenhouse: '01', instructions: 'Row 12 has 4 clogged emitters (positions 3, 7, 15, 22). Replacement emitters are in the maintenance shed, bin C-4. Flow rate should be 2 GPH — test each one after install. Let David know when done so he can check chemistry downstream.' },
  { id: '4', title: 'Chemistry readings — all houses', assignee: 'David L.', priority: 'high', instructions: 'Full circuit today: drain EC, pH, and temperature at every station. K0 has been trending high on EC (2.8 yesterday) — double-check that reading and note if the drain % is also off. Use the Chemistry form for each house. Flag anything outside the ranges on the Flags table.' },
]

const initialDone: Task[] = [
  { id: '5', title: 'Seed new lettuce trays — GH 04', assignee: 'Sarah P.', priority: 'low', greenhouse: '04', instructions: 'Seed 120 trays of Romaine (variety: Green Forest). Use seeding room B. Log the trace code in the Seeding form.' },
  { id: '6', title: 'Pack line QC — Grade 1 sort', assignee: 'Lisa W.', priority: 'medium', instructions: 'Run quality check on first 200 boxes off the line. Grade 1 criteria: straight, no scarring, 6–8 inch length. Pull anything borderline to Grade 2. Log reject count in the Pack QC form.' },
]

const additionalTasks: Task[] = [
  { id: 'a1', title: 'Help harvest GH 01 — Cukes Block B', assignee: 'Unassigned', priority: 'medium', greenhouse: '01', instructions: 'Support crew in GH 01. Same procedure as K0 — blue bins, Grade 1 sort. Report to Marcus when you arrive.' },
  { id: 'a2', title: 'Clean and organize packing area', assignee: 'Unassigned', priority: 'low', instructions: 'Sweep floors, organize empty bins by size, restock box supplies from storage room. Standard end-of-shift cleanup.' },
  { id: 'a3', title: 'Spray GH 07 — Oxidate treatment', assignee: 'Carlos M.', priority: 'medium', greenhouse: '07', instructions: 'Oxidate 2.0 at 1:200 dilution. Spray undersides of leaves, focus on Rows 1–8 where scouting found aphid pressure. Wear full PPE. Coordinate with Marcus on timing.' },
]

const priorityBadgeColor: Record<Task['priority'], 'red' | 'amber' | 'slate'> = {
  high: 'red',
  medium: 'amber',
  low: 'slate',
}

export default function TaskList() {
  const { role, device } = useApp()
  const [activeTab, setActiveTab] = useState<'todo' | 'done'>('todo')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAdditional, setShowAdditional] = useState(false)
  const [todoTasks, setTodoTasks] = useState(initialTasks)
  const [doneTasks, setDoneTasks] = useState(initialDone)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const isManager = role === 'manager'
  const isPhone = device === 'phone'
  const navigate = useNavigate()

  const tabs = [
    { id: 'todo' as const, label: 'To Do', count: todoTasks.length },
    { id: 'done' as const, label: 'Done', count: doneTasks.length },
  ]

  const completeTask = (id: string) => {
    const task = todoTasks.find(t => t.id === id)
    if (task) {
      setTodoTasks(prev => prev.filter(t => t.id !== id))
      setDoneTasks(prev => [task, ...prev])
    }
    setConfirmingId(null)
    setExpandedId(null)
  }

  const uncompleteTask = (id: string) => {
    const task = doneTasks.find(t => t.id === id)
    if (task) {
      setDoneTasks(prev => prev.filter(t => t.id !== id))
      setTodoTasks(prev => [...prev, task])
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  const displayTasks = activeTab === 'todo' ? todoTasks : doneTasks

  return (
    <PageShell phone={isPhone}>
      {/* Segmented tabs */}
      <div className="mb-5">
        <Tabs
          tabs={tabs}
          active={activeTab}
          onChange={(id) => setActiveTab(id as 'todo' | 'done')}
        />
      </div>

      {/* All done state */}
      {todoTasks.length === 0 && activeTab === 'todo' && !showAdditional && (
        <SuccessState
          icon={<PartyPopper size={28} className="text-green-600" />}
          title="All caught up!"
          message="You've completed all your assigned tasks for today."
          actionLabel="Take on additional tasks"
          onAction={() => setShowAdditional(true)}
        />
      )}

      {todoTasks.length === 0 && activeTab === 'todo' && showAdditional && (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-4">
            <PartyPopper size={28} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">All caught up!</h3>
          <p className="text-sm text-slate-500 mb-5">You've completed all your assigned tasks for today.</p>
        </div>
      )}

      {/* Additional tasks */}
      {showAdditional && activeTab === 'todo' && todoTasks.length === 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-slate-700">Available Tasks</span>
            <Badge color="blue">{additionalTasks.length} available</Badge>
          </div>
          <div className="flex flex-col gap-2">
            {additionalTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                isDone={false}
                isExpanded={expandedId === task.id}
                toggleExpand={toggleExpand}
                isManager={isManager}
                navigate={navigate}
                onComplete={() => {}}
                onUncomplete={() => {}}
                confirmingId={confirmingId}
                setConfirmingId={setConfirmingId}
                isVolunteer
              />
            ))}
          </div>
        </div>
      )}

      {/* Task cards */}
      <div className="flex flex-col gap-2">
        {displayTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            isDone={activeTab === 'done'}
            isExpanded={expandedId === task.id}
            toggleExpand={toggleExpand}
            isManager={isManager}
            navigate={navigate}
            onComplete={() => completeTask(task.id)}
            onUncomplete={() => uncompleteTask(task.id)}
            confirmingId={confirmingId}
            setConfirmingId={setConfirmingId}
          />
        ))}
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {confirmingId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${isPhone ? 'absolute' : 'fixed'} inset-0 bg-black/30 z-50`}
              onClick={() => setConfirmingId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`${isPhone ? 'absolute' : 'fixed'} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 p-6 w-[320px] max-w-[90%]`}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
                  <CheckCircle2 size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Complete this task?</h3>
                <p className="text-sm text-slate-500 mb-5">
                  {todoTasks.find(t => t.id === confirmingId)?.title}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={() => setConfirmingId(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => completeTask(confirmingId)}
                  >
                    Yes, complete
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageShell>
  )
}

function TaskCard({ task, isDone, isExpanded, toggleExpand, isManager, navigate, onComplete, onUncomplete, confirmingId, setConfirmingId, isVolunteer }: {
  task: Task
  isDone: boolean
  isExpanded: boolean
  toggleExpand: (id: string) => void
  isManager: boolean
  navigate: (path: string) => void
  onComplete: () => void
  onUncomplete: () => void
  confirmingId: string | null
  setConfirmingId: (id: string | null) => void
  isVolunteer?: boolean
}) {
  return (
    <Card active={isExpanded} className={!isExpanded ? 'hover:border-green-300 hover:shadow-md' : ''}>
      {/* Task header */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => toggleExpand(task.id)}
      >
        <div className="flex items-start gap-3">
          <button
            className="mt-0.5 border-none bg-transparent cursor-pointer p-0"
            onClick={e => {
              e.stopPropagation()
              if (isDone) {
                onUncomplete()
              } else {
                setConfirmingId(task.id)
              }
            }}
          >
            {isDone ? (
              <CheckCircle2 size={20} className="text-green-500" />
            ) : (
              <Circle size={20} className="text-slate-400 hover:text-green-500 transition-colors" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-medium text-[15px] ${isDone ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {isManager && (
                <span className="text-sm text-slate-500">{task.assignee}</span>
              )}
              {task.greenhouse && (
                <Badge color="green">GH {task.greenhouse}</Badge>
              )}
              <Badge color={priorityBadgeColor[task.priority]}>
                {task.priority}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isVolunteer && (
              <Button
                variant="secondary"
                size="sm"
                onClick={e => { e.stopPropagation() }}
              >
                <Hand size={12} className="inline mr-1" />
                Take this
              </Button>
            )}
            {task.instructions && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="mt-1 text-slate-400"
              >
                <ChevronDown size={18} />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Accordion */}
      <AnimatePresence>
        {isExpanded && task.instructions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <div className="border-t border-slate-100 pt-3">
                <div className="bg-slate-50 rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <MessageSquare size={12} className="text-slate-400" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Instructions</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{task.instructions}</p>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation()
                    navigate('/chat')
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 cursor-pointer hover:from-green-100 hover:to-emerald-100 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm shadow-green-500/25 shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-green-700">Chat about this task</div>
                    <div className="text-xs text-green-600/70">Ask AI questions with full farm context</div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
