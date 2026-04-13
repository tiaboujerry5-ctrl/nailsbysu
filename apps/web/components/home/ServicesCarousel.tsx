'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { fetchServices, type Service } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

const SERVICE_IMAGE: Record<string, string> = {
  'Signature Gel-X Extensions': '/svc-gelx.png',
  'The "Su" French':            '/svc-french.png',
  'Structured Manicure':        '/svc-structured.png',
  'Hand-Painted Art: Tier 1':   '/svc-art1.png',
  'Hand-Painted Art: Tier 2':   '/svc-art2.png',
  'Luxe Gel Pedicure':          '/svc-pedicure.png',
  'Apres Removal & Refresh':    '/svc-removal.png',
  'Emergency Nail Repair':      '/svc-gelx.png',
}

function ServiceCard({ service, position }: { service: Service; position: number }) {
  const img = SERVICE_IMAGE[service.name] ?? '/svc-french.png'
  const isActive = position === 0
  const absPos = Math.abs(position)
  const rotateY    = position * 42
  const translateX = position * 260
  const translateZ = isActive ? 60 : -absPos * 80
  const scale      = isActive ? 1 : 1 - absPos * 0.12
  const opacity    = absPos > 2 ? 0 : 1 - absPos * 0.3

  return (
    <motion.div
      animate={{ rotateY, x: translateX, z: translateZ, scale, opacity }}
      transition={{ type: 'spring', stiffness: 90, damping: 22 }}
      style={{
        position: 'absolute',
        transformStyle: 'preserve-3d',
        width: 260,
        left: '50%',
        marginLeft: -130,
        cursor: isActive ? 'default' : 'pointer',
        zIndex: 10 - absPos,
        pointerEvents: absPos > 2 ? 'none' : 'auto',
      }}
    >
      <div style={{
        borderRadius: 12,
        background: '#191b24',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: isActive
          ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(224,80,112,0.2)'
          : '0 16px 40px rgba(0,0,0,0.5)',
        overflow: 'hidden',
      }}>
        {/* Nail image */}
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={service.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: isActive
                ? 'saturate(1.15) contrast(1.05)'
                : 'saturate(0.6) brightness(0.65)',
              transition: 'filter 0.5s ease',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(15,16,22,0.95) 0%, transparent 55%)',
          }} />
          <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
            <p style={{
              fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: '#e05070', marginBottom: 4,
            }}>
              {service.category}
            </p>
            <p style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 17, color: '#f0ebe3', lineHeight: 1.2,
            }}>
              {service.name}
            </p>
          </div>
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <span style={{
              background: 'rgba(224,80,112,0.9)', color: '#fff',
              fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 9999,
            }}>
              {formatPrice(service.price)}
            </span>
          </div>
        </div>

        {/* Expanded footer on active card */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '14px 16px 16px' }}>
                {service.description && (
                  <p style={{
                    fontSize: 12, color: 'rgba(200,185,170,0.65)',
                    lineHeight: 1.6, marginBottom: 14,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {service.description}
                  </p>
                )}
                <Link
                  href={`/book?serviceId=${service.id}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#e05070', color: '#fff',
                    fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em',
                    padding: '10px 0', borderRadius: 6, textDecoration: 'none',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#c4405a' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#e05070' }}
                >
                  Book now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function ServicesCarousel() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  })
  const [active, setActive] = useState(0)
  const total = services?.length ?? 0

  const prev = useCallback(() => setActive(p => (p - 1 + total) % total), [total])
  const next = useCallback(() => setActive(p => (p + 1) % total), [total])

  // Auto-rotate
  useEffect(() => {
    if (!total) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [next, total])

  // Keyboard navigation
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [prev, next])

  if (isLoading || !services?.length) {
    return (
      <div style={{ height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1016' }}>
        <p style={{ color: 'rgba(200,185,170,0.4)', fontSize: 13 }}>Loading services...</p>
      </div>
    )
  }

  return (
    <section style={{ padding: '80px 0 100px', background: '#0f1016', position: 'relative', overflow: 'hidden' }}>
      {/* Ghost nail images for atmosphere */}
      {(['/svc-art1.png', '/svc-pedicure.png'] as const).map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" aria-hidden style={{
          position: 'absolute', objectFit: 'cover', opacity: 0.04,
          borderRadius: 8, filter: 'saturate(0)',
          width: 180, height: 240,
          top: (['10%', '55%'] as const)[i],
          left: (['-2%', '88%'] as const)[i],
          transform: `rotate(${([-14, 10] as const)[i]}deg)`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#e05070', marginBottom: 14 }}>
            What we offer
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.5rem,6vw,4.5rem)',
            color: '#f0ebe3', lineHeight: 1, letterSpacing: '-0.02em',
          }}>
            Our <span style={{ color: '#e05070', fontStyle: 'italic' }}>services</span>
          </h2>
        </div>

        {/* 3D Stage — drag to navigate */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            if (info.offset.x > 60) prev()
            else if (info.offset.x < -60) next()
          }}
          style={{
            position: 'relative',
            height: 560,
            perspective: '1100px',
            perspectiveOrigin: '50% 42%',
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          <div style={{ position: 'relative', height: '100%', transformStyle: 'preserve-3d' }}>
            {services.map((service, i) => {
              let position = i - active
              if (position > total / 2) position -= total
              if (position < -total / 2) position += total
              return <ServiceCard key={service.id} service={service} position={position} />
            })}
          </div>
        </motion.div>

        {/* Controls row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 32 }}>
          <button
            onClick={prev} aria-label="Previous"
            style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)', color: '#f0ebe3',
              cursor: 'pointer', fontSize: 18, transition: 'all 0.25s',
            }}
          >
            ←
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to service ${i + 1}`}
                style={{
                  width: i === active ? 24 : 6, height: 6,
                  borderRadius: 9999, border: 'none', cursor: 'pointer', padding: 0,
                  background: i === active ? '#e05070' : 'rgba(255,255,255,0.18)',
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={next} aria-label="Next"
            style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)', color: '#f0ebe3',
              cursor: 'pointer', fontSize: 18, transition: 'all 0.25s',
            }}
          >
            →
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link
            href="/services"
            style={{
              fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em',
              color: 'rgba(200,185,170,0.4)', textDecoration: 'none',
              borderBottom: '1px solid rgba(200,185,170,0.12)', paddingBottom: 2,
            }}
          >
            View full menu
          </Link>
        </div>
      </div>
    </section>
  )
}
