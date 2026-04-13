'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, useEffect } from 'react'
import { fetchMe } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

function AuthInitializer() {
  const { setUser, setLoaded } = useAuthStore()

  useEffect(() => {
    fetchMe()
      .then(({ user }) => setUser(user))
      .catch(() => setLoaded())
  }, [setUser, setLoaded])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}
