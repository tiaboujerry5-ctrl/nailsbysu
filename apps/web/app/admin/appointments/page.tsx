import { AdminAppointmentsClient } from '@/components/admin/AdminAppointmentsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Appointments' }

export default function AdminAppointmentsPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-noir tracking-tight">Appointments</h1>
      </div>
      <AdminAppointmentsClient />
    </div>
  )
}
