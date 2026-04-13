'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { fetchMyBookings, type Booking } from '@/lib/api'
import { formatPrice, formatDate, formatTime, cn } from '@/lib/utils'

const STATUS_STYLES: Record<Booking['status'], string> = {
  PENDING: 'bg-gold/15 text-gold-dark',
  CONFIRMED: 'bg-accent/10 text-accent',
  COMPLETED: 'bg-taupe/15 text-taupe-dark',
  CANCELLED: 'bg-charcoal/10 text-charcoal/50',
  NO_SHOW: 'bg-charcoal/10 text-charcoal/50',
}

const STATUS_LABELS: Record<Booking['status'], string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  NO_SHOW: 'No show',
}

export function ClientDashboardClient() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: fetchMyBookings,
  })

  const upcoming = bookings?.filter((b) =>
    ['PENDING', 'CONFIRMED'].includes(b.status)
  ) ?? []

  const past = bookings?.filter((b) =>
    ['COMPLETED', 'CANCELLED', 'NO_SHOW'].includes(b.status)
  ) ?? []

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-cream-dark animate-pulse rounded-[--radius-card]" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/book"
          className="inline-flex items-center gap-2 bg-noir text-cream px-6 py-3 rounded-[--radius-pill] text-sm hover:bg-charcoal transition-colors duration-300 active:scale-[0.98]"
        >
          Book new appointment
        </Link>
        <Link
          href="/appointments"
          className="inline-flex items-center gap-2 border border-taupe/25 text-charcoal px-6 py-3 rounded-[--radius-pill] text-sm hover:bg-cream-dark transition-colors duration-300"
        >
          View all appointments
        </Link>
      </div>

      {/* Upcoming */}
      <section>
        <h2 className="font-display text-2xl text-noir mb-6 tracking-tight">Upcoming</h2>
        {upcoming.length === 0 ? (
          <div className="py-12 rounded-[--radius-card] border border-dashed border-taupe/30 text-center">
            <p className="text-sm text-muted mb-4">No upcoming appointments</p>
            <Link href="/book" className="text-sm text-noir underline underline-offset-4">
              Book one now
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-taupe/15">
            {upcoming.map((booking, i) => (
              <BookingRow key={booking.id} booking={booking} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section>
          <h2 className="font-display text-2xl text-noir mb-6 tracking-tight">History</h2>
          <div className="divide-y divide-taupe/15">
            {past.slice(0, 5).map((booking, i) => (
              <BookingRow key={booking.id} booking={booking} index={i} muted />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function BookingRow({
  booking,
  index,
  muted = false,
}: {
  booking: Booking
  index: number
  muted?: boolean
}) {
  return (
    <motion.div
      className={cn('py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3', muted && 'opacity-60')}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
    >
      <div>
        <p className="font-medium text-noir">{booking.service.name}</p>
        <p className="text-sm text-muted mt-0.5">
          {formatDate(booking.scheduledAt)} at {formatTime(booking.scheduledAt)}
          {booking.staff && ` · ${booking.staff.firstName} ${booking.staff.lastName}`}
        </p>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <p className="font-display text-lg text-noir">{formatPrice(booking.service.price)}</p>
        <span
          className={cn(
            'px-3 py-1 rounded-[--radius-pill] text-xs font-medium',
            STATUS_STYLES[booking.status]
          )}
        >
          {STATUS_LABELS[booking.status]}
        </span>
      </div>
    </motion.div>
  )
}
