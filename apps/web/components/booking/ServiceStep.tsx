'use client'

import { useQuery } from '@tanstack/react-query'
import { useBookingStore } from '@/store/bookingStore'
import { fetchServices, type Service } from '@/lib/api'
import { formatPrice, formatDuration, cn } from '@/lib/utils'
import { useState } from 'react'

export function ServiceStep() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  })

  const setService = useBookingStore((s) => s.setService)
  const selectedService = useBookingStore((s) => s.selectedService)
  const categories = [...new Set(services?.map((s) => s.category) ?? [])]
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? (services ?? []).filter((s) => s.category === activeCategory)
    : services ?? []

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-cream-dark animate-pulse rounded-[--radius-card]" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-noir mb-2">Choose a service</h2>
      <p className="text-sm text-muted mb-8">Select the service you&apos;d like to book.</p>

      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'px-3 py-1.5 rounded-[--radius-pill] text-xs transition-colors duration-300',
              activeCategory === null ? 'bg-noir text-cream' : 'bg-cream-dark text-charcoal hover:bg-blush'
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-[--radius-pill] text-xs transition-colors duration-300',
                activeCategory === cat ? 'bg-noir text-cream' : 'bg-cream-dark text-charcoal hover:bg-blush'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((service: Service) => (
          <button
            key={service.id}
            onClick={() => setService(service)}
            className={cn(
              'w-full text-left p-5 rounded-[--radius-card] border transition-all duration-300',
              selectedService?.id === service.id
                ? 'border-noir bg-noir/5'
                : 'border-taupe/20 bg-cream hover:border-taupe/50 hover:bg-cream-dark'
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-taupe mb-1">{service.category}</p>
                <p className="font-medium text-noir">{service.name}</p>
                {service.description && (
                  <p className="mt-1 text-xs text-muted leading-relaxed max-w-[44ch]">
                    {service.description}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-lg text-noir">{formatPrice(service.price)}</p>
                <p className="text-xs text-muted">{formatDuration(service.duration)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
