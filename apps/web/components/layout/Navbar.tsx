'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { signOut } from '@/lib/api'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, clearUser } = useAuthStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  async function handleSignOut() {
    await signOut().catch(() => {})
    clearUser()
    router.push('/')
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 flex justify-center pt-5 px-4 transition-all duration-500',
          scrolled ? 'pt-3' : 'pt-5'
        )}
      >
        <nav
          className={cn(
            'flex items-center gap-8 px-6 py-3 rounded-[--radius-pill] transition-all duration-500',
            scrolled
              ? 'bg-cream/90 backdrop-blur-md border border-taupe/20 shadow-[0_4px_24px_-8px_rgba(26,26,26,0.08)]'
              : 'bg-cream/60 backdrop-blur-sm border border-taupe/10'
          )}
        >
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-noir shrink-0"
          >
            Nails by Su
          </Link>

          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'text-sm transition-colors duration-300',
                    pathname === href
                      ? 'text-accent font-medium'
                      : 'text-charcoal/70 hover:text-noir'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-charcoal/70 hover:text-noir transition-colors duration-300"
                >
                  {user.email}
                </Link>
                <Link
                  href="/book"
                  className="group flex items-center gap-2 bg-noir text-cream text-sm px-5 py-2.5 rounded-[--radius-pill] hover:bg-charcoal transition-colors duration-300 active:scale-[0.98]"
                >
                  Book now
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-charcoal/70 hover:text-noir transition-colors duration-300"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm text-charcoal/70 hover:text-noir transition-colors duration-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/book"
                  className="group flex items-center gap-2 bg-noir text-cream text-sm px-5 py-2.5 rounded-[--radius-pill] hover:bg-charcoal transition-colors duration-300 active:scale-[0.98]"
                >
                  Book now
                  <span className="w-5 h-5 rounded-full bg-cream/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden ml-2 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span
              className={cn(
                'block w-5 h-px bg-noir transition-all duration-300 origin-center',
                open && 'rotate-45 translate-y-[3.5px]'
              )}
            />
            <span
              className={cn(
                'block w-5 h-px bg-noir transition-all duration-300 origin-center',
                open && '-rotate-45 -translate-y-[3.5px]'
              )}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-30 bg-cream/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            <ul className="flex flex-col items-center gap-6">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link
                    href={href}
                    className="font-display text-4xl text-noir tracking-tight hover:text-accent transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <Link
                href="/book"
                className="bg-noir text-cream px-8 py-4 rounded-[--radius-pill] text-lg hover:bg-charcoal transition-colors duration-300"
              >
                Book now
              </Link>
              {!user && (
                <Link
                  href="/sign-in"
                  className="text-sm text-charcoal/70 hover:text-noir transition-colors duration-300"
                >
                  Sign in
                </Link>
              )}
              {user && (
                <button
                  onClick={handleSignOut}
                  className="text-sm text-charcoal/70 hover:text-noir transition-colors duration-300"
                >
                  Sign out
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
