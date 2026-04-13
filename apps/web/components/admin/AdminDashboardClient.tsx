'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { fetchMyBookings } from '@/lib/api'
import { formatDate, formatTime, cn } from '@/lib/utils'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

async function fetchAllBookings() {
  const res = await fetch(`${API_BASE}/api/bookings/admin`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch bookings')
  return res.json()
}

type Booking = Awaited<ReturnType<typeof fetchMyBookings>>[number]

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-gold/15 text-noir',
  CONFIRMED: 'bg-accent/10 text-accent',
  COMPLETED: 'bg-taupe/15 text-taupe-dark',
  CANCELLED: 'bg-charcoal/10 text-charcoal/50',
  NO_SHOW: 'bg-charcoal/10 text-charcoal/50',
}

export function AdminDashboardClient() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: fetchAllBookings,
  })

  const total = bookings?.length ?? 0
  const confirmed = bookings?.filter((b: Booking) => b.status === 'CONFIRMED').length ?? 0
  const pending = bookings?.filter((b: Booking) => b.status === 'PENDING').length ?? 0
  const completed = bookings?.filter((b: Booking) => b.status === 'COMPLETED').length ?? 0

  const stats = [
    { label: 'Total bookings', value: total },
    { label: 'Confirmed', value: confirmed },
    { label: 'Pending review', value: pending },
    { label: 'Completed', value: completed },
  ]

  const recent = (bookings ?? []).slice(0, 8)

  return (
    <div className="space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value }, i) => (
          <motion.div
            key={label}
            className="bg-cream rounded-[--radius-card] p-6 border border-taupe/15"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.12em] text-taupe mb-2">{label}</p>
            <p className="font-display text-4xl text-noir">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent bookings */}
      <div>
        <h2 className="font-display text-2xl text-noir mb-6 tracking-tight">Recent bookings</h2>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-cream animate-pulse rounded-[--radius-card]" />
            ))}
          </div>
        ) : (
          <div className="bg-cream rounded-[--radius-card] border border-taupe/15 divide-y divide-taupe/10">
            {recent.map((booking: Booking & { user?: { profile?: { firstName: string; lastName: string } } }, i: number) => (
              <motion.div
                key={booking.id}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <div>
                  <p className="text-sm font-medium text-noir">{booking.service.name}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {formatDate(booking.scheduledAt)} at {formatTime(booking.scheduledAt)}
                  </p>
                </div>
                <span
                  className={cn(
                    'self-start sm:self-auto px-3 py-1 rounded-[--radius-pill] text-xs font-medium',
                    STATUS_STYLES[booking.status]
                  )}
                >
                  {booking.status.charAt(0) + booking.status.slice(1).toLowerCase()}
                </span>
              </motion.div>
            ))}
            {recent.length === 0 && (
              <p className="px-6 py-8 text-sm text-muted text-center">No bookings yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
