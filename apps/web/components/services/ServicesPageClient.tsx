'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { fetchServices, type Service } from '@/lib/api'
import { formatPrice, cn } from '@/lib/utils'
import Link from 'next/link'

// Map service names to their nail art photos
const SERVICE_IMAGE: Record<string, string> = {
  'Signature Gel-X Extensions':  '/svc-gelx.png',
  'The "Su" French':             '/svc-french.png',
  'Structured Manicure':         '/svc-structured.png',
  'Hand-Painted Art: Tier 1':    '/svc-art1.png',
  'Hand-Painted Art: Tier 2':    '/svc-art2.png',
  'Luxe Gel Pedicure':           '/svc-pedicure.png',
  'Apres Removal & Refresh':     '/svc-removal.png',
  'Emergency Nail Repair':       '/svc-gelx.png',
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const img = SERVICE_IMAGE[service.name] ?? '/svc-french.png'

  return (
    <motion.div
      className="group flex flex-col"
      style={{ background: '#1e2132', border: '1px solid rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Nail photo */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={service.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
          style={{ filter: 'saturate(1.08) contrast(1.03)' }}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-[--radius-pill]"
            style={{ background: 'rgba(10,25,47,0.72)', color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
          >
            {service.category}
          </span>
        </div>
        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <span
            className="font-display text-sm px-3 py-1 rounded-[--radius-pill]"
            style={{ background: 'rgba(196,81,106,0.92)', color: '#fff', backdropFilter: 'blur(8px)' }}
          >
            {formatPrice(service.price)}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="font-display text-xl leading-tight tracking-tight mb-2"
          style={{ color: '#f0ebe3' }}
        >
          {service.name}
        </h3>
        {service.description && (
          <p className="text-xs leading-relaxed flex-1 mb-4 line-clamp-3" style={{ color: 'rgba(200,185,170,0.55)' }}>
            {service.description}
          </p>
        )}
        <Link
          href={`/book?serviceId=${service.id}`}
          className="mt-auto inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.12em] px-5 py-3 transition-all duration-300 active:scale-[0.98]"
          style={{ background: '#e05070', color: '#ffffff', borderRadius: 4 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#c4405a' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#e05070' }}
        >
          Book this service
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

export function ServicesPageClient() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  })

  const categories = [...new Set(services?.map((s) => s.category) ?? [])]
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? services?.filter((s) => s.category === activeCategory) ?? []
    : services ?? []

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ background: '#1e2132', borderRadius: 2 }}>
            <div className="aspect-[4/5] animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div className="p-5 space-y-3">
              <div className="h-5 animate-pulse rounded w-3/4" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="h-3 animate-pulse rounded w-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {['All', ...categories].map((cat) => {
            const isActive = cat === 'All' ? activeCategory === null : activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === 'All' ? null : cat)}
                className={cn('px-4 py-2 text-sm transition-all duration-300', 'rounded-[--radius-pill]')}
                style={{
                  background: isActive ? '#e05070' : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#fff' : 'rgba(200,185,170,0.6)',
                  border: '1px solid',
                  borderColor: isActive ? '#e05070' : 'rgba(255,255,255,0.08)',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((service: Service, i: number) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-sm" style={{ color: 'rgba(200,185,170,0.4)' }}>No services found</div>
      )}
    </div>
  )
}
