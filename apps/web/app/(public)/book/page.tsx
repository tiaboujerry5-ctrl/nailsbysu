import { BookingWizard } from '@/components/booking/BookingWizard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Reserve your nail appointment online.',
}

export default function BookPage() {
  return (
    <div className="min-h-[100dvh] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">Reservations</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-tight text-noir leading-none">
            Book your session
          </h1>
        </div>
        <BookingWizard />
      </div>
    </div>
  )
}
