import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Overview' }

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.15em] text-taupe mb-2">Admin</p>
        <h1 className="font-display text-4xl text-noir tracking-tight">Overview</h1>
      </div>
      <AdminDashboardClient />
    </div>
  )
}
