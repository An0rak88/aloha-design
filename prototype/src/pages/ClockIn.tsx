import { useState } from 'react'
import { MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import PageShell from '../components/shared/PageShell'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'

export default function ClockIn() {
  const { device } = useApp()
  const [clockedIn, setClockedIn] = useState(false)
  const [inGeofence] = useState(true)
  const isPhone = device === 'phone'

  return (
    <PageShell phone={isPhone} className="flex flex-col items-center">
      <div className={`w-full ${isPhone ? '' : 'max-w-md'} text-center`}>
        {/* Status indicator */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-5 ${
          clockedIn ? 'bg-green-100' : 'bg-slate-100'
        }`}>
          {clockedIn ? (
            <CheckCircle2 size={40} className="text-green-600" />
          ) : (
            <Clock size={40} className="text-slate-400" />
          )}
        </div>

        <h1 className={`font-bold text-slate-800 m-0 mb-1 ${isPhone ? 'text-xl' : 'text-2xl'}`}>
          {clockedIn ? 'Clocked In' : 'Clock In'}
        </h1>

        {clockedIn ? (
          <p className="text-sm text-green-600 mb-6">Since 6:28 AM — 3h 12m today</p>
        ) : (
          <p className="text-sm text-slate-500 mb-6">Tap below to start your shift</p>
        )}

        {/* Geofence status */}
        <div className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl mb-6 ${
          inGeofence ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <MapPin size={16} className={inGeofence ? 'text-green-600' : 'text-red-500'} />
          <span className={`text-sm font-medium ${inGeofence ? 'text-green-700' : 'text-red-600'}`}>
            {inGeofence ? 'You are on-site — Hawaii Farming' : 'You are outside the farm perimeter'}
          </span>
        </div>

        {/* Clock in/out button */}
        {inGeofence ? (
          <Button
            onClick={() => setClockedIn(c => !c)}
            variant={clockedIn ? 'secondary' : 'primary'}
            size="lg"
            fullWidth
            className="py-4 text-lg font-semibold"
          >
            {clockedIn ? 'Clock Out' : 'Clock In'}
          </Button>
        ) : (
          <div className="flex items-center gap-2 justify-center text-sm text-red-500">
            <AlertCircle size={16} />
            <span>You must be on-site to clock in</span>
          </div>
        )}

        {/* Today's log */}
        {clockedIn && (
          <Card className="mt-6 p-4 text-left">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Today's Log</h3>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Clock In</span>
              <span className="text-sm font-medium text-slate-800">6:28 AM</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Hours so far</span>
              <span className="text-sm font-medium text-slate-800">3h 12m</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-600">Location</span>
              <span className="text-sm font-medium text-green-600">On-site</span>
            </div>
          </Card>
        )}
      </div>
    </PageShell>
  )
}
