import { AdminGalleryClient } from '@/components/admin/AdminGalleryClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Gallery' }

export default function AdminGalleryPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-noir tracking-tight">Gallery</h1>
      </div>
      <AdminGalleryClient />
    </div>
  )
}
