import { GalleryPageClient } from '@/components/gallery/GalleryPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse our portfolio of nail art and designs.',
}

export default function GalleryPage() {
  return (
    <div style={{ minHeight: '100dvh', background: '#14161f' }}>
      {/* Dark header */}
      <div className="px-6 md:px-12" style={{ paddingTop: 160, paddingBottom: 64, background: '#0e1019', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nails-leopard.jpg" alt="" aria-hidden style={{
          position: 'absolute', right: 0, top: 0, height: '100%', width: '28%',
          objectFit: 'cover', opacity: 0.07, filter: 'saturate(0.3)',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(200,185,170,0.4)', marginBottom: 16 }}>
            Portfolio
          </p>
          <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(3.5rem,8vw,7.5rem)', color: '#f0ebe3', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            The <span style={{ color: '#e05070', fontStyle: 'italic' }}>gallery</span>
          </h1>
          <p style={{ marginTop: 20, fontSize: 15, maxWidth: '48ch', lineHeight: 1.7, color: 'rgba(200,185,170,0.5)' }}>
            A curated selection of recent nail art, sets, and designs.
          </p>
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

      <div className="px-6 md:px-12" style={{ background: '#14161f', paddingTop: 64, paddingBottom: 112 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <GalleryPageClient />
        </div>
      </div>
    </div>
  )
}
