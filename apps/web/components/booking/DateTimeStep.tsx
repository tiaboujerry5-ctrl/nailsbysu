'use client'

import { useState } from 'react'
import { useBookingStore } from '@/store/bookingStore'
import { cn } from '@/lib/utils'
import { format, addDays, isSameDay, startOfToday, isAfter } from 'date-fns'

const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
]

function buildDays(): Date[] {
  const today = startOfToday()
  return Array.from({ length: 14 }, (_, i) => addDays(today, i + 1))
}

export function DateTimeStep() {
  const { selectedDate, selectedTime, setDate, setTime, setStep } = useBookingStore()
  const [days] = useState(buildDays)

  const canContinue = selectedDate && selectedTime

  function handleContinue() {
    if (canContinue) setStep('confirm')
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-noir mb-2">Pick a date & time</h2>
      <p className="text-sm text-muted mb-8">Available slots for the next two weeks.</p>

      {/* Date picker */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.12em] text-taupe mb-4">Date</p>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <button
              key={day.toISOString()}
              onClick={() => setDate(day)}
              className={cn(
                'flex flex-col items-center py-2.5 rounded-[--radius-card-inner] border text-xs transition-all duration-300',
                selectedDate && isSameDay(day, selectedDate)
                  ? 'border-noir bg-noir text-cream'
                  : 'border-taupe/20 bg-cream hover:border-taupe/50 hover:bg-cream-dark text-charcoal'
              )}
            >
              <span className="text-[10px] uppercase tracking-wide opacity-60">
                {format(day, 'EEE')}
              </span>
              <span className="font-medium mt-0.5">{format(day, 'd')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.12em] text-taupe mb-4">Time</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {TIME_SLOTS.map((time) => (
            <button
              key={time}
              onClick={() => setTime(time)}
              className={cn(
                'py-2 rounded-[--radius-card-inner] border text-xs font-medium transition-all duration-300',
                selectedTime === time
                  ? 'border-noir bg-noir text-cream'
                  : 'border-taupe/20 bg-cream hover:border-taupe/50 hover:bg-cream-dark text-charcoal'
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep('staff')}
          className="flex-1 py-3 border border-taupe/25 rounded-[--radius-pill] text-sm text-charcoal hover:bg-cream-dark transition-colors duration-300"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="flex-1 py-3 bg-noir text-cream rounded-[--radius-pill] text-sm hover:bg-charcoal transition-colors duration-300 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Review booking
        </button>
      </div>
    </div>
  )
}
