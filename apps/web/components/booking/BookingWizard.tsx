'use client'

import { useBookingStore } from '@/store/bookingStore'
import { ServiceStep } from './ServiceStep'
import { StaffStep } from './StaffStep'
import { DateTimeStep } from './DateTimeStep'
import { ConfirmStep } from './ConfirmStep'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  { key: 'service', label: 'Service' },
  { key: 'staff', label: 'Artist' },
  { key: 'datetime', label: 'Date & Time' },
  { key: 'confirm', label: 'Confirm' },
]

export function BookingWizard() {
  const step = useBookingStore((s) => s.step)
  const stepIndex = STEPS.findIndex((s) => s.key === step)

  return (
    <div>
      {/* Step progress */}
      <div className="flex items-center gap-2 mb-12">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-500 ${
                  i < stepIndex
                    ? 'bg-noir text-cream'
                    : i === stepIndex
                    ? 'bg-accent text-cream'
                    : 'bg-taupe/20 text-taupe'
                }`}
              >
                {i < stepIndex ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs transition-colors duration-300 hidden sm:inline ${
                  i === stepIndex ? 'text-noir font-medium' : 'text-muted'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px w-8 mx-1 transition-colors duration-500 ${
                  i < stepIndex ? 'bg-noir' : 'bg-taupe/20'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        >
          {step === 'service' && <ServiceStep />}
          {step === 'staff' && <StaffStep />}
          {step === 'datetime' && <DateTimeStep />}
          {(step === 'confirm' || step === 'payment') && <ConfirmStep />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
