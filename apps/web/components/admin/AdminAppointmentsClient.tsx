'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDate, formatTime, cn } from '@/lib/utils'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

async function fetchAllBookings() {
  const res = await fetch(`${API_BASE}/api/bookings/admin`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

async function updateStatus(id: string, status: string) {
  const res = await fetch(`${API_BASE}/api/bookings/admin/${id}/status`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update')
  return res.json()
}

const STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'] as const
type Status = (typeof STATUSES)[number]

const STATUS_STYLES: Record<Status, string> = {
  PENDING: 'bg-gold/15 text-noir',
  CONFIRMED: 'bg-accent/10 text-accent',
  COMPLETED: 'bg-taupe/15 text-taupe',
  CANCELLED: 'bg-charcoal/10 text-charcoal/50',
  NO_SHOW: 'bg-charcoal/10 text-charcoal/50',
}

export function AdminAppointmentsClient() {
  const qc = useQueryClient()
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: fetchAllBookings,
  })

  const { mutate: changeStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-bookings'] }),
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-cream animate-pulse rounded-[--radius-card]" />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-cream rounded-[--radius-card] border border-taupe/15 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-taupe/15">
              <th className="text-left px-6 py-3 text-xs uppercase tracking-[0.12em] text-taupe font-medium">Service</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-[0.12em] text-taupe font-medium">Date & Time</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-[0.12em] text-taupe font-medium">Artist</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-[0.12em] text-taupe font-medium">Status</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-[0.12em] text-taupe font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-taupe/10">
            {(bookings ?? []).map((b: {
              id: string
              service: { name: string }
              staff?: { firstName: string; lastName: string } | null
              scheduledAt: string
              status: Status
            }) => (
              <tr key={b.id} className="hover:bg-cream-dark transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-noir">{b.service.name}</td>
                <td className="px-6 py-4 text-muted">
                  {formatDate(b.scheduledAt)} {formatTime(b.scheduledAt)}
                </td>
                <td className="px-6 py-4 text-muted">
                  {b.staff ? `${b.staff.firstName} ${b.staff.lastName}` : '—'}
                </td>
                <td className="px-6 py-4">
                  <span className={cn('px-2.5 py-1 rounded-[--radius-pill] text-xs font-medium', STATUS_STYLES[b.status])}>
                    {b.status.charAt(0) + b.status.slice(1).toLowerCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={b.status}
                    onChange={(e) => changeStatus({ id: b.id, status: e.target.value })}
                    className="text-xs bg-cream-dark border border-taupe/20 rounded px-2 py-1 text-charcoal outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0) + s.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!bookings?.length && (
          <p className="px-6 py-12 text-sm text-muted text-center">No appointments found</p>
        )}
      </div>
    </div>
  )
}
