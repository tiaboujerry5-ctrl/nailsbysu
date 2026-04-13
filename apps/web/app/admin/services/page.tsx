import { AdminServicesClient } from '@/components/admin/AdminServicesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Services' }

export default function AdminServicesPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-noir tracking-tight">Services</h1>
      </div>
      <AdminServicesClient />
    </div>
  )
}
