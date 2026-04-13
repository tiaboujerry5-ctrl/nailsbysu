import type { Metadata } from 'next'
import { SignInForm } from '@/components/auth/SignInForm'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0e1019', padding: '64px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Nail decoration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svc-gelx.png" alt="" aria-hidden style={{
        position: 'absolute', right: '-5%', top: '10%',
        width: 200, height: 260, objectFit: 'cover',
        borderRadius: 12, opacity: 0.06, filter: 'saturate(0)',
        transform: 'rotate(8deg)', pointerEvents: 'none',
      }} />
      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 28, color: '#f0ebe3', marginBottom: 8 }}>Welcome back</p>
          <p style={{ fontSize: 13, color: 'rgba(200,185,170,0.5)' }}>Sign in to manage your appointments</p>
        </div>
        <div style={{ background: '#1e2132', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', padding: 40 }}>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
