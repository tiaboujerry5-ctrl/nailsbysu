'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 35, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 35, damping: 22 })

  const imgX = useTransform(springX, [-1, 1], ['-14px', '14px'])
  const imgY = useTransform(springY, [-1, 1], ['-8px', '8px'])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1)
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden flex flex-col justify-end"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
    >
      {/* Background image — subtle parallax on mouse move */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ inset: '-20px', x: imgX, y: imgY }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-nails.jpg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="w-full h-full object-cover object-center"
          style={{ filter: 'saturate(1.28) contrast(1.08) brightness(0.94)' }}
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,18,38,0.35) 0%, rgba(8,18,38,0.18) 38%, rgba(8,18,38,0.72) 70%, rgba(8,18,38,0.95) 100%)',
        }}
      />

      {/* Small copy top-left */}
      <motion.p
        className="absolute top-28 left-6 md:left-12 max-w-[28ch] text-sm leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.55)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease }}
      >
        No guesswork. No compromise. Just bespoke nail artistry that helps your natural beauty shine.
      </motion.p>

      {/* Bottom content block */}
      <div className="relative z-10 w-full px-6 md:px-12 pb-14">
        {/* Eyebrow */}
        <motion.p
          className="text-xs uppercase tracking-[0.22em] mb-5"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          Intelligent nail artistry
        </motion.p>

        {/* Heading */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display leading-none tracking-tight"
            style={{ fontSize: 'clamp(4rem,11vw,9.5rem)', color: '#ffffff' }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, delay: 0.45, ease }}
          >
            Nail art,{' '}
            <span style={{ color: '#C4516A', fontStyle: 'italic' }}>refined.</span>
          </motion.h1>
        </div>

        {/* Bottom bar — stats + CTA */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-10 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
        >
          <div className="flex gap-10">
            {[
              { value: '4.9', label: 'Average rating' },
              { value: '340+', label: 'Happy clients' },
              { value: '12', label: 'Signature services' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-2xl md:text-3xl" style={{ color: '#ffffff' }}>
                  {value}
                </p>
                <p className="text-xs mt-1 uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/book"
            className="group self-start md:self-auto inline-flex items-center gap-3 text-sm px-7 py-4 rounded-[--radius-pill] transition-all duration-300 active:scale-[0.97]"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.18)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
          >
            Reserve your session
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
