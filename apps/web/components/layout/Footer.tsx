'use client'

import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#0b0d14',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Scattered nail decoration — faint */}
      {(['/svc-french.png', '/svc-art2.png', '/svc-gelx.png'] as const).map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" aria-hidden style={{
          position: 'absolute', objectFit: 'cover', opacity: 0.05,
          borderRadius: 8, filter: 'saturate(0)',
          width: 160, height: 200,
          top: (['5%', '40%', '10%'] as const)[i],
          left: (['-1%', '50%', '88%'] as const)[i],
          transform: `rotate(${([-8, 6, -10] as const)[i]}deg)`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 40px', position: 'relative', zIndex: 1 }}>
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12" style={{ marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <p style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 28, color: '#f0ebe3', letterSpacing: '-0.02em', marginBottom: 12,
            }}>
              Nails by Su
            </p>
            <p style={{ fontSize: 13, color: 'rgba(200,185,170,0.5)', lineHeight: 1.8, maxWidth: '30ch' }}>
              Bespoke nail artistry crafted with care. Every detail, perfectly considered.
            </p>
            {/* Accent line */}
            <div style={{ width: 32, height: 2, background: '#e05070', borderRadius: 9999, marginTop: 24 }} />
          </div>

          {/* Navigate */}
          <div>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(200,185,170,0.4)', marginBottom: 20 }}>
              Navigate
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { href: '/services', label: 'Services & Pricing' },
                { href: '/gallery',  label: 'Gallery' },
                { href: '/about',   label: 'About' },
                { href: '/book',    label: 'Book Appointment' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{ fontSize: 13, color: 'rgba(200,185,170,0.55)', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f0ebe3' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(200,185,170,0.55)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(200,185,170,0.4)', marginBottom: 20 }}>
              Reach us
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:hello@nailsbysu.com" style={{ fontSize: 13, color: 'rgba(200,185,170,0.55)', textDecoration: 'none' }}>
                hello@nailsbysu.com
              </a>
              <a href="tel:+15143927841" style={{ fontSize: 13, color: 'rgba(200,185,170,0.55)', textDecoration: 'none' }}>
                +1 (514) 392-7841
              </a>
              <p style={{ fontSize: 13, color: 'rgba(200,185,170,0.55)', lineHeight: 1.6 }}>
                Montreal, QC<br />Canada
              </p>
              <p style={{ fontSize: 12, color: 'rgba(200,185,170,0.35)', marginTop: 4 }}>
                Tue – Sat, 10:00 – 19:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
          <p style={{ fontSize: 11, color: 'rgba(200,185,170,0.3)' }}>
            &copy; {year} Nails by Su. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[{ href: '/privacy', label: 'Privacy' }, { href: '/terms', label: 'Terms' }].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ fontSize: 11, color: 'rgba(200,185,170,0.3)', textDecoration: 'none' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
