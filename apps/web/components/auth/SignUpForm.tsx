'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export function SignUpForm() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { user } = await signUp({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone || undefined,
      })
      setUser(user)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-noir/80 mb-1.5">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={update('firstName')}
            className="w-full px-4 py-3 bg-white border border-taupe/30 rounded-xl text-noir placeholder-taupe/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
            placeholder="Jane"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-noir/80 mb-1.5">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={update('lastName')}
            className="w-full px-4 py-3 bg-white border border-taupe/30 rounded-xl text-noir placeholder-taupe/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-noir/80 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={update('email')}
          className="w-full px-4 py-3 bg-white border border-taupe/30 rounded-xl text-noir placeholder-taupe/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-noir/80 mb-1.5">
          Phone <span className="text-taupe font-normal">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={update('phone')}
          className="w-full px-4 py-3 bg-white border border-taupe/30 rounded-xl text-noir placeholder-taupe/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          placeholder="+1 (555) 000-0000"
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
          minLength={8}
          autoComplete="new-password"
          value={form.password}
          onChange={update('password')}
          className="w-full px-4 py-3 bg-white border border-taupe/30 rounded-xl text-noir placeholder-taupe/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          placeholder="8+ characters"
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
        {loading ? 'Creating account…' : 'Create account'}
      </button>

      <p className="text-center text-sm text-taupe">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-accent hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </form>
  )
}
