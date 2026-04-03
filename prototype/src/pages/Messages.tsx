import { useState } from 'react'
import { Send, Paperclip, CheckSquare } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import Avatar from '../components/shared/Avatar'
import Button from '../components/shared/Button'

interface Message {
  id: string
  sender: string
  text: string
  time: string
  isMe: boolean
  taskRef?: string
}

const conversations = [
  { id: '1', name: 'Eric S.', role: 'Manager', lastMsg: 'Can you check GH 08 drip lines?', unread: 2, time: '9:15 AM' },
  { id: '2', name: 'Harvest Team', role: 'Group', lastMsg: 'K0 harvest done — 1,914 lbs', unread: 0, time: '8:45 AM' },
  { id: '3', name: 'David L.', role: 'Grower', lastMsg: 'Chemistry readings uploaded', unread: 0, time: 'Yesterday' },
]

const messages: Message[] = [
  { id: '1', sender: 'Eric S.', text: 'Morning — can you check the drip lines in GH 08? Row 12 looked off yesterday.', time: '9:12 AM', isMe: false },
  { id: '2', sender: 'Eric S.', text: 'I created a task for it already.', time: '9:13 AM', isMe: false, taskRef: 'Replace drip emitters Row 12' },
  { id: '3', sender: 'Me', text: 'On it. Heading there after K0 harvest.', time: '9:15 AM', isMe: true },
]

export default function Messages() {
  const { device } = useApp()
  const [activeConvo, setActiveConvo] = useState('1')
  const isPhone = device === 'phone'

  if (isPhone) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 pb-2">
          <h1 className="text-xl font-bold text-slate-800 m-0">Messages</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(c => (
            <div key={c.id} className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 active:bg-slate-50 cursor-pointer">
              <Avatar initials={c.name.charAt(0)} size="lg" className="shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800 text-sm">{c.name}</span>
                  <span className="text-xs text-slate-400">{c.time}</span>
                </div>
                <p className="text-sm text-slate-500 truncate mt-0.5">{c.lastMsg}</p>
              </div>
              {c.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {c.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* Conversation list */}
      <div className="w-[300px] border-r border-slate-200 bg-white flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h1 className="text-lg font-bold text-slate-800 m-0">Messages</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(c => (
            <div
              key={c.id}
              onClick={() => setActiveConvo(c.id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                activeConvo === c.id ? 'bg-green-50 border-r-2 border-green-500' : 'hover:bg-slate-50'
              }`}
            >
              <Avatar initials={c.name.charAt(0)} size="lg" className="shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800 text-sm">{c.name}</span>
                  <span className="text-xs text-slate-400">{c.time}</span>
                </div>
                <p className="text-sm text-slate-500 truncate mt-0.5">{c.lastMsg}</p>
              </div>
              {c.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {c.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Message thread */}
      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center gap-3">
          <Avatar initials="E" size="md" />
          <div>
            <span className="font-semibold text-slate-800 text-sm">Eric S.</span>
            <span className="text-xs text-slate-400 ml-2">Manager</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[380px] ${msg.isMe ? '' : ''}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm ${
                  msg.isMe
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-md'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
                {msg.taskRef && (
                  <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200">
                    <CheckSquare size={14} className="text-green-600" />
                    <span className="text-xs text-slate-600 font-medium">{msg.taskRef}</span>
                  </div>
                )}
                <span className={`text-xs text-slate-400 mt-1 block ${msg.isMe ? 'text-right' : ''}`}>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-2">
            <button className="p-1 text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400"
            />
            <Button size="sm" className="p-1.5 rounded-xl">
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
