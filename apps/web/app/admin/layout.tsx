'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return
    if (!user) {
      router.replace('/sign-in')
      return
    }
    if (user.role !== 'ADMIN') {
      router.replace('/')
    }
  }, [isLoaded, user, router])

  if (!isLoaded || !user || user.role !== 'ADMIN') return null

  return (
    <div className="min-h-dvh flex bg-cream-dark">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
