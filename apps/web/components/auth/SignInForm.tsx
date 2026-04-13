'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export function SignInForm() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { user } = await signIn({ email, password })
      setUser(user)
      router.push(user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-noir/80 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-taupe/30 rounded-xl text-noir placeholder-taupe/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-noir/80 mb-1.5">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-taupe/30 rounded-xl text-noir placeholder-taupe/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-noir text-cream py-3 rounded-[--radius-pill] font-medium hover:bg-noir/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      <p className="text-center text-sm text-taupe">
        No account?{' '}
        <Link href="/sign-up" className="text-accent hover:underline font-medium">
          Create one
        </Link>
      </p>
    </form>
  )
}
