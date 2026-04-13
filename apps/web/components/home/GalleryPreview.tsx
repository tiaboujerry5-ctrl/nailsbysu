'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { fetchGallery } from '@/lib/api'

export function GalleryPreview() {
  const { data: images, isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
  })

  const preview = images?.slice(0, 6) ?? []

  return (
    <section className="py-32 px-6 md:px-12 bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">Recent work</p>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight text-noir leading-none">
              The gallery
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-sm text-charcoal/70 hover:text-noir underline underline-offset-4 decoration-taupe/40 hover:decoration-noir transition-all duration-300 self-start md:self-auto"
          >
            Full gallery
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-blush/40 animate-pulse rounded-[--radius-card]" />
            ))}
          </div>
        ) : preview.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {preview.map((img, i) => (
              <motion.div
                key={img.id}
                className="group relative aspect-square overflow-hidden rounded-[--radius-card] bg-blush/20"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <Image
                  src={img.url}
                  alt={img.caption ?? 'Nail art by Su'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[--ease-silk]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-cream text-sm">{img.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-muted text-sm">Gallery coming soon</div>
        )}
      </div>
    </section>
  )
}
