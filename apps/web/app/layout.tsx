import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Providers } from '@/components/shared/Providers'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Nails by Su',
    default: 'Nails by Su — Luxury Nail Artistry',
  },
  description:
    'Premium nail salon offering bespoke nail art, manicures, and pedicures. Book your appointment online.',
  openGraph: {
    siteName: 'Nails by Su',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <Providers>{children}</Providers>
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
