import type { Metadata } from 'next'
import { SignUpForm } from '@/components/auth/SignUpForm'

export const metadata: Metadata = {
  title: 'Create Account',
}

export default function SignUpPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-cream px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-noir mb-2">Create your account</h1>
          <p className="text-taupe text-sm">Join Nails by Su and book your first appointment</p>
        </div>
        <div className="bg-white rounded-[--radius-card] shadow-sm border border-taupe/10 p-8">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
