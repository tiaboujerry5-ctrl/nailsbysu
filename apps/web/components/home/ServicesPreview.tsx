'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { fetchServices, type Service } from '@/lib/api'
import { formatPrice, formatDuration } from '@/lib/utils'

export function ServicesPreview() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  })

  const preview = services?.slice(0, 4) ?? []

  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">What we offer</p>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight text-noir leading-none">
              Our services
            </h2>
          </div>
          <Link
            href="/services"
            className="text-sm text-charcoal/70 hover:text-noir underline underline-offset-4 decoration-taupe/40 hover:decoration-noir transition-all duration-300 self-start md:self-auto"
          >
            View full menu
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-taupe/15">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-cream p-8 h-36 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-taupe/15">
            {preview.map((service: Service, i: number) => (
              <motion.div
                key={service.id}
                className="group bg-cream hover:bg-cream-dark p-8 cursor-pointer transition-colors duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-taupe mb-2">
                      {service.category}
                    </p>
                    <h3 className="font-display text-2xl text-noir tracking-tight">{service.name}</h3>
                    {service.description && (
                      <p className="mt-2 text-sm text-charcoal/60 max-w-[40ch] leading-relaxed">
                        {service.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display text-xl text-noir">{formatPrice(service.price)}</p>
                    <p className="text-xs text-muted mt-1">{formatDuration(service.duration)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
