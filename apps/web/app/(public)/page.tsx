import Link from 'next/link'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesCarousel } from '@/components/home/ServicesCarousel'
import { GalleryMarquee } from '@/components/home/GalleryMarquee'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'

export const metadata = {
  title: 'Nails by Su — Luxury Nail Artistry',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesCarousel />
      <GalleryMarquee />
      <TestimonialsSection />

      {/* ── CTA Section ── */}
      <section
        style={{
          padding: '120px 24px',
          background: '#14161f',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background nail decoration */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/joylynne.png" alt="" aria-hidden style={{
          position: 'absolute', right: 0, top: 0, height: '100%',
          width: '40%', objectFit: 'cover', objectPosition: 'center top',
          opacity: 0.12, filter: 'saturate(0.5)',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <p style={{
                fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em',
                color: 'rgba(200,185,170,0.5)', marginBottom: 20,
              }}>
                Ready to begin?
              </p>
              <h2 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.8rem,5vw,5rem)',
                color: '#f0ebe3',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}>
                Your hands deserve{' '}
                <span style={{ color: '#e05070', fontStyle: 'italic' }}>the very best.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end' }}>
              <Link
                href="/book"
                className="btn-accent"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '16px 32px',
                  borderRadius: 9999,
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                Book an appointment →
              </Link>
              <Link
                href="/services"
                style={{
                  fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em',
                  color: 'rgba(200,185,170,0.4)', textDecoration: 'none',
                  borderBottom: '1px solid rgba(200,185,170,0.15)', paddingBottom: 2,
                }}
              >
                View all services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
