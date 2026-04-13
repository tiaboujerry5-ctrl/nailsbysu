'use client'

import { useAuthStore } from '@/store/authStore'
import { ClientDashboardClient } from '@/components/client/ClientDashboardClient'

export default function ClientDashboardPage() {
  const { user } = useAuthStore()

  return (
    <div className="min-h-[100dvh] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-taupe mb-3">Welcome back</p>
          <h1 className="font-display text-5xl tracking-tight text-noir leading-none">
            {user?.email?.split('@')[0] ?? 'Dashboard'}
          </h1>
        </div>
        <ClientDashboardClient />
      </div>
    </div>
  )
}
