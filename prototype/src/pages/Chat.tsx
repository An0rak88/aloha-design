import { useState } from 'react'
import { Send, Sparkles, Plus, Clock, MessageSquare } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

interface ChatThread {
  id: string
  title: string
  time: string
  preview: string
}

const chatHistory: ChatThread[] = [
  { id: 'current', title: 'Aphid spray protocol', time: 'Just now', preview: 'What\'s the spray protocol for aphids...' },
  { id: '2', title: 'GH K0 chemistry flags', time: '2 hrs ago', preview: 'Why is K0 drain EC trending high?' },
  { id: '3', title: 'Harvest efficiency question', time: 'Yesterday', preview: 'Which greenhouse has the best lb/hr...' },
  { id: '4', title: 'Lettuce seeding schedule', time: 'Yesterday', preview: 'When is the next lettuce seeding cycle?' },
  { id: '5', title: 'Fertilizer Recipe 3A', time: 'Mar 30', preview: 'What\'s the target EC for Recipe 3A?' },
  { id: '6', title: 'IPM scouting thresholds', time: 'Mar 28', preview: 'At what count do we escalate aphids?' },
]

const sampleConversation: ChatMessage[] = [
  { id: '1', role: 'user', text: 'What\'s the spray protocol for aphids on cukes?' },
  { id: '2', role: 'assistant', text: 'For aphid treatment on cucumbers, the standard protocol is:\n\n1. **Oxidate 2.0** — Apply at 1:200 dilution, spray undersides of leaves\n2. **Wait 48 hours**, then scout again\n3. If still present, apply **Suffoil-X** at 1:100\n4. Log the spray in the Spray Schedule form\n\nGH 08 had aphid pressure last week — Ana R. completed scouting and the Oxidate treatment brought levels down. Want me to create a spray task for a specific greenhouse?' },
  { id: '3', role: 'user', text: 'Show me drain EC trends for GH 08 last 2 weeks' },
  { id: '4', role: 'assistant', text: 'Here are the drain EC readings for GH 08 over the last 2 weeks:\n\n| Date | Drain EC | Status |\n|------|----------|--------|\n| 3/19 | 2.0 | Normal |\n| 3/21 | 2.1 | Normal |\n| 3/24 | 2.1 | Normal |\n| 3/26 | 2.2 | Normal |\n| 3/28 | 2.3 | Normal |\n| 3/31 | 2.1 | Normal |\n| 4/1 | 2.1 | Normal |\n\nGH 08 EC has been stable in the 2.0–2.3 range, well within the 1.7–2.7 target. No action needed. Compare this with K0, which is currently at 2.8 and trending upward.' },
]

export default function Chat() {
  const { device } = useApp()
  const [messages] = useState(sampleConversation)
  const [activeThread, setActiveThread] = useState('current')
  const isPhone = device === 'phone'

  if (isPhone) {
    return (
      <div className="flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[85%]">
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Sparkles size={10} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-slate-400">Aloha AI</span>
                  </div>
                )}
                <div className={`px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl rounded-br-md'
                    : 'bg-white text-slate-700 rounded-2xl rounded-bl-md border border-slate-200'
                }`}>
                  <MessageContent text={msg.text} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-2.5">
            <input
              type="text"
              placeholder="Ask about your farm data..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400"
            />
            <button className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none cursor-pointer shadow-lg shadow-green-500/25">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* Chat history sidebar */}
      <div className="w-[260px] bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 border-none cursor-pointer hover:shadow-xl transition-shadow">
            <Plus size={16} />
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider px-2">Recent</span>
          </div>
          {chatHistory.map(thread => (
            <button
              key={thread.id}
              onClick={() => setActiveThread(thread.id)}
              className={`w-full text-left px-4 py-3 cursor-pointer transition-colors border-none ${
                activeThread === thread.id
                  ? 'bg-green-50 border-r-2 border-r-green-500'
                  : 'bg-transparent hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-sm font-medium truncate ${activeThread === thread.id ? 'text-green-700' : 'text-slate-700'}`}>
                  {thread.title}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={10} className="text-slate-400 shrink-0" />
                <span className="text-xs text-slate-400">{thread.time}</span>
              </div>
              <p className="text-xs text-slate-400 truncate mt-0.5">{thread.preview}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[600px]">
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Sparkles size={10} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-slate-400">Aloha AI</span>
                  </div>
                )}
                <div className={`px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl rounded-br-md'
                    : 'bg-white text-slate-700 rounded-2xl rounded-bl-md border border-slate-200'
                }`}>
                  <MessageContent text={msg.text} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-2.5">
            <input
              type="text"
              placeholder="Ask about your farm data..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400"
            />
            <button className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none cursor-pointer shadow-lg shadow-green-500/25">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageContent({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => {
        if (line.startsWith('|')) {
          return <code key={i} className="block text-xs font-mono bg-slate-50 px-2 py-0.5 rounded my-0.5 text-slate-600">{line}</code>
        }
        if (/^\d\./.test(line)) {
          return <div key={i} className="ml-2 my-0.5">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</div>
        }
        return <span key={i}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}{i < text.split('\n').length - 1 && <br />}</span>
      })}
    </>
  )
}
