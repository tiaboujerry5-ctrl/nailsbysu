import { AppointmentsClient } from '@/components/client/AppointmentsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Appointments' }

export default function AppointmentsPage() {
  return (
    <div className="min-h-[100dvh] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-taupe mb-3">Your bookings</p>
          <h1 className="font-display text-5xl tracking-tight text-noir leading-none">
            Appointments
          </h1>
        </div>
        <AppointmentsClient />
      </div>
    </div>
  )
}
