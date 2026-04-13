'use client'

import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    name: 'Amélie Tremblay',
    handle: '@ameliet',
    text: "Su has a gift. My nails have never looked this polished — and the studio feels like a sanctuary. I'm a regular now.",
    rating: 5,
  },
  {
    name: 'Jade Fontaine',
    handle: '@jadefontaine',
    text: "The attention to detail is extraordinary. She listened to exactly what I wanted and delivered something even better.",
    rating: 5,
  },
  {
    name: 'Camille Okafor',
    handle: '@camilleokafor',
    text: "Worth every cent. The gel set lasted nearly five weeks without a chip. I refer everyone I know.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">What clients say</p>
          <h2 className="font-display text-5xl md:text-6xl tracking-tight text-noir leading-none">
            Words from the chair
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-taupe/15">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.handle}
              className="bg-cream p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <div key={j} className="w-3 h-3 rounded-full bg-gold" />
                ))}
              </div>
              <p className="text-charcoal/80 leading-relaxed text-sm mb-8">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-sm font-medium text-noir">{t.name}</p>
                <p className="text-xs text-muted mt-0.5">{t.handle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
