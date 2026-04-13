'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'

// The nail-only images provided — used for the 3D marquee
const NAIL_IMAGES = [
  { src: '/svc-gelx.png',       alt: 'Dalmatian gems nails' },
  { src: '/svc-french.png',     alt: 'White French tip nails' },
  { src: '/svc-art1.png',       alt: 'Ghost nail art' },
  { src: '/svc-art2.png',       alt: 'Autumn nail art' },
  { src: '/svc-structured.png', alt: 'Autumn close-up nails' },
  { src: '/svc-pedicure.png',   alt: 'Butterfly tips nails' },
  { src: '/svc-removal.png',    alt: 'Leopard daisy nails' },
  { src: '/nails-french.jpg',   alt: 'French rhinestone nails' },
  { src: '/nails-halloween.jpg',alt: 'Ghost crossbone art' },
  { src: '/nails-autumn.jpg',   alt: 'Autumn floral nails' },
  { src: '/nails-butterfly.jpg',alt: 'Brown butterfly tips' },
  { src: '/nails-leopard.jpg',  alt: 'Leopard print nails' },
  { src: '/nails-autumn2.jpg',  alt: 'Pressed flower nails' },
]

// Split into two rows
const ROW1 = [...NAIL_IMAGES.slice(0, 7), ...NAIL_IMAGES.slice(0, 7)] // duplicated for seamless loop
const ROW2 = [...NAIL_IMAGES.slice(6), ...NAIL_IMAGES.slice(6)]

function MarqueeImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 })
  const rotateX = useTransform(springY, [-1, 1], [8, -8])
  const rotateY = useTransform(springX, [-1, 1], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1)
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      style={{
        position: 'relative',
        width: 180,
        height: 220,
        flexShrink: 0,
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        cursor: 'crosshair',
      }}
      whileHover={{ scale: 1.06, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'saturate(1.1) contrast(1.05)',
          display: 'block',
        }}
      />
      {/* Shine overlay on hover */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)',
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export function GalleryMarquee() {
  return (
    <section
      style={{
        padding: '96px 0',
        background: '#0e1019',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Gradient edges */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '15%', height: '100%', zIndex: 2,
        background: 'linear-gradient(to right, #0e1019 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '15%', height: '100%', zIndex: 2,
        background: 'linear-gradient(to left, #0e1019 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56, position: 'relative', zIndex: 3 }}>
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#e05070', marginBottom: 14 }}>
          Recent work
        </p>
        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(2.5rem,6vw,4.5rem)',
          color: '#f0ebe3', lineHeight: 1, letterSpacing: '-0.02em',
        }}>
          The <span style={{ color: '#e05070', fontStyle: 'italic' }}>gallery</span>
        </h2>
      </div>

      {/* 3D perspective container */}
      <div style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}>
        <div style={{ transform: 'rotateX(8deg)', transformStyle: 'preserve-3d' }}>
          {/* Row 1 — scrolls left */}
          <div style={{ overflow: 'hidden', marginBottom: 12 }}>
            <div
              className="marquee-left"
              style={{
                display: 'flex',
                gap: 12,
                width: 'max-content',
                willChange: 'transform',
              }}
            >
              {ROW1.map((img, i) => (
                <MarqueeImage key={`r1-${i}`} src={img.src} alt={img.alt} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div style={{ overflow: 'hidden' }}>
            <div
              className="marquee-right"
              style={{
                display: 'flex',
                gap: 12,
                width: 'max-content',
                willChange: 'transform',
              }}
            >
              {ROW2.map((img, i) => (
                <MarqueeImage key={`r2-${i}`} src={img.src} alt={img.alt} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 52, position: 'relative', zIndex: 3 }}>
        <Link
          href="/gallery"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#f0ebe3',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '12px 28px',
            borderRadius: 9999,
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'rgba(224,80,112,0.15)'
            el.style.borderColor = 'rgba(224,80,112,0.4)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'transparent'
            el.style.borderColor = 'rgba(255,255,255,0.15)'
          }}
        >
          View full gallery →
        </Link>
      </div>
    </section>
  )
}
