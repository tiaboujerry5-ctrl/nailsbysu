'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { fetchMyBookings, cancelBooking, type Booking } from '@/lib/api'
import { formatPrice, formatDate, formatTime, cn } from '@/lib/utils'
import Link from 'next/link'

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

export function AppointmentsClient() {
  const queryClient = useQueryClient()
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: fetchMyBookings,
  })

  const { mutate: cancel, isPending: cancelling } = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-bookings'] }),
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-cream-dark animate-pulse rounded-[--radius-card]" />
        ))}
      </div>
    )
  }

  if (!bookings?.length) {
    return (
      <div className="py-24 rounded-[--radius-card] border border-dashed border-taupe/30 text-center">
        <p className="text-sm text-muted mb-4">You have no appointments yet.</p>
        <Link href="/book" className="text-sm text-noir underline underline-offset-4">
          Book your first session
        </Link>
      </div>
    )
  }

  return (
    <div className="divide-y divide-taupe/15">
      {bookings.map((booking: Booking, i: number) => (
        <motion.div
          key={booking.id}
          className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          <div>
            <p className="font-medium text-noir">{booking.service.name}</p>
            <p className="text-sm text-muted mt-0.5">
              {formatDate(booking.scheduledAt)} at {formatTime(booking.scheduledAt)}
              {booking.staff && ` · ${booking.staff.firstName} ${booking.staff.lastName}`}
            </p>
            {booking.notes && (
              <p className="text-xs text-muted/70 mt-1 italic">{booking.notes}</p>
            )}
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
            {['PENDING', 'CONFIRMED'].includes(booking.status) && (
              <button
                onClick={() => cancel(booking.id)}
                disabled={cancelling}
                className="text-xs text-muted hover:text-accent underline underline-offset-4 transition-colors duration-300 disabled:opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
