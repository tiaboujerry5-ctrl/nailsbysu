import { AdminStaffClient } from '@/components/admin/AdminStaffClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Staff' }

export default function AdminStaffPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-noir tracking-tight">Staff</h1>
      </div>
      <AdminStaffClient />
    </div>
  )
}
