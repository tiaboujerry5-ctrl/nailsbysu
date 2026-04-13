'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { signOut } from '@/lib/api'
import { cn } from '@/lib/utils'

const NAV = [
  {
    href: '/admin/dashboard',
    label: 'Overview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: '/admin/appointments',
    label: 'Appointments',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/admin/services',
    label: 'Services',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M3 4h10M3 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/admin/staff',
    label: 'Staff',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/admin/gallery',
    label: 'Gallery',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 11l4-4 3 3 2-2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, clearUser } = useAuthStore()

  async function handleSignOut() {
    await signOut().catch(() => {})
    clearUser()
    router.push('/')
  }

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 bg-noir text-cream min-h-dvh py-8">
      <div className="px-6 mb-10">
        <p className="font-display text-xl tracking-tight">Nails by Su</p>
        <p className="text-xs text-taupe mt-0.5">Admin</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-300',
              pathname === href
                ? 'bg-cream/10 text-cream'
                : 'text-cream/50 hover:text-cream hover:bg-cream/5'
            )}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-6 pt-6 border-t border-cream/10 flex items-center justify-between">
        <p className="text-xs text-cream/50 truncate">{user?.email}</p>
        <button
          onClick={handleSignOut}
          className="text-xs text-cream/50 hover:text-cream transition-colors duration-300"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
