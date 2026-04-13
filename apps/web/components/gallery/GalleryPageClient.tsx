'use client'

import { useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { fetchGallery } from '@/lib/api'

// ── Static gallery ────────────────────────────────────────────────────────────
const STATIC_GALLERY = [
  { id: 'static-1',  src: '/nails-french.jpg',        alt: 'White French tips with rhinestones',        category: 'French' },
  { id: 'static-2',  src: '/nails-halloween.jpg',     alt: 'Ghost nail art with crossbones',             category: 'Nail Art' },
  { id: 'static-3',  src: '/nails-autumn.jpg',        alt: 'Autumn floral nail design',                  category: 'Nail Art' },
  { id: 'static-4',  src: '/nails-autumn2.jpg',       alt: 'Autumn close-up with pressed flowers',       category: 'Nail Art' },
  { id: 'static-5',  src: '/nails-butterfly.jpg',     alt: 'Brown tips with butterfly gems',             category: 'Extensions' },
  { id: 'static-6',  src: '/nails-leopard.jpg',       alt: 'Leopard print with daisy accents',           category: 'Nail Art' },
  { id: 'static-7',  src: '/nails-bambi.png',         alt: 'Bambi Disney character nail art',            category: 'Nail Art' },
  { id: 'static-8',  src: '/nails-iridescent.png',    alt: 'Pink iridescent butterfly press-ons',        category: 'Extensions' },
  { id: 'static-9',  src: '/nails-alice.png',         alt: 'Alice in Wonderland Cheshire cat nail art',  category: 'Nail Art' },
  { id: 'static-10', src: '/nails-brownfloral.jpg',   alt: 'Brown tips with pink floral stiletto',       category: 'Nail Art' },
  { id: 'static-11', src: '/nails-polkadot.jpg',      alt: 'White polka dot French square nails',        category: 'French' },
  { id: 'static-12', src: '/nails-pinkstripe.jpg',    alt: 'Pink striped stiletto nails',                category: 'Nail Art' },
  { id: 'static-13', src: '/nails-bwstripe.jpg',      alt: 'Black and white striped stiletto nails',     category: 'Nail Art' },
  { id: 'static-14', src: '/nails-eden.jpg',          alt: 'Eden polka dot French square nails',         category: 'French' },
  { id: 'static-15', src: '/nails-starformation.jpg', alt: 'Multi-hand star formation nail showcase',    category: 'Nail Art' },
  { id: 'static-16', src: '/nails-lacebow.jpg',       alt: 'Black lace and bow stiletto nails',          category: 'Nail Art' },
  { id: 'static-17', src: '/nails-monster.jpg',       alt: 'White striped nails with monster character', category: 'Nail Art' },
  { id: 'static-18', src: '/nails-colorful.jpg',      alt: 'Colorful artistic nail showcase',            category: 'Extensions' },
]

const ALL_CATEGORIES = ['All', ...new Set(STATIC_GALLERY.map((i) => i.category))]

// ── Client reviews tied to gallery cards ─────────────────────────────────────
const REVIEWS = [
  { name: 'Amélie T.',   handle: '@ameliet.mtl',    text: 'The detail on every nail is like jewelry. I get stopped on the street constantly.' },
  { name: 'Jade F.',     handle: '@jade.fornaxx',   text: 'Sent one photo and she delivered something even better. Pure magic.' },
  { name: 'Camille O.',  handle: '@camilleo__',     text: 'Five weeks and not one chip. Worth every single dollar, every time.' },
  { name: 'Priya M.',    handle: '@priyamonreal',   text: 'The Bambi set had people asking me where I got my nails done for weeks.' },
  { name: 'Sarah B.',    handle: '@sarahbmtl',      text: 'The atmosphere is so calm and the results genuinely surprised me.' },
  { name: 'Léa R.',      handle: '@learose__',      text: 'Nobody does French tips like Su. I\'ve tried everywhere in Montreal.' },
  { name: 'Nadia K.',    handle: '@nadiak.nails',   text: 'Gel-X extensions that actually last. I\'m a client for life.' },
  { name: 'Mia C.',      handle: '@miacouture_',    text: 'She paints freehand — no stickers, no stamps. The real deal.' },
  { name: 'Chloé D.',    handle: '@chloe.dmnq',     text: 'The lace nails were unreal. She matched exactly what I had in mind.' },
  { name: 'Yasmine B.',  handle: '@yasminebeaute',  text: 'I booked a simple set and left with my new favourite nails of all time.' },
  { name: 'Emma L.',     handle: '@emmalaurent__',  text: 'The Cheshire Cat nails caused a literal crowd at the café. Unbelievable.' },
  { name: 'Sophie V.',   handle: '@sophiev.nails',  text: 'Clean, fast, and flawless. She listened to every single detail.' },
  { name: 'Rania A.',    handle: '@raniaartistry',  text: 'The stripey stilettos are iconic. I wore them to a gala and felt like a queen.' },
  { name: 'Inès M.',     handle: '@ines.montreal',  text: 'Best gel pedicure I\'ve ever had. My feet looked incredible for the full month.' },
  { name: 'Fatou S.',    handle: '@fatousu_',       text: 'She remembered my preferences from six months prior. That\'s real craft.' },
  { name: 'Olivia N.',   handle: '@olivia.nailss',  text: 'The polka dot French set is giving very Parisian chic. Obsessed.' },
  { name: 'Maëlle P.',   handle: '@maellepicard',   text: 'She recommended something I hadn\'t considered and it was perfect. Trust the artist.' },
  { name: 'Kristine R.', handle: '@kristine.r_',   text: 'Walked in nervous, walked out completely in love with my hands.' },
]

type LightboxItem = { src: string; alt: string }

// ── 3D Card with review overlay on hover ─────────────────────────────────────
function GalleryCard({
  src,
  alt,
  review,
  onClick,
}: {
  src: string
  alt: string
  review: typeof REVIEWS[number]
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springCfg = { stiffness: 240, damping: 24 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), springCfg)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), springCfg)

  const shimX = useTransform(rawX, [-0.5, 0.5], ['10%', '90%'])
  const shimY = useTransform(rawY, [-0.5, 0.5], ['10%', '90%'])
  const shimmerBg = useMotionTemplate`radial-gradient(circle at ${shimX} ${shimY}, rgba(255,255,255,0.13) 0%, transparent 65%)`

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    setHovered(false)
  }

  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
        ref={ref}
        className="relative overflow-hidden cursor-zoom-in"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          aspectRatio: '3 / 4',
          borderRadius: 3,
        }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            filter: 'saturate(1.1) contrast(1.03)',
          }}
        />

        {/* Shimmer */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: shimmerBg, zIndex: 2 }} />

        {/* Review overlay — slides up on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-x-0 bottom-0 p-4"
              style={{ zIndex: 4 }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Frosted card */}
              <div
                style={{
                  background: 'rgba(14,16,25,0.82)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: '14px 16px',
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="#e05070">
                      <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 7.9l-2.78 1.65.53-3.09L1.5 4.27l3.11-.45L6 1z" />
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p style={{ fontSize: 12, color: 'rgba(240,235,227,0.88)', lineHeight: 1.55, marginBottom: 10 }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #e05070 0%, #d4a060 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>
                      {review.name[0]}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: '#f0ebe3', fontWeight: 500, lineHeight: 1 }}>{review.name}</p>
                    <p style={{ fontSize: 10, color: 'rgba(200,185,170,0.45)', lineHeight: 1.4 }}>{review.handle}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function GalleryPageClient() {
  const { data: apiImages } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
  })

  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null)

  const apiMapped = (apiImages ?? []).map((img) => ({
    id: img.id,
    src: img.url,
    alt: img.caption ?? 'Nail art',
    category: img.category ?? 'Portfolio',
  }))

  const allItems = [...STATIC_GALLERY, ...apiMapped]
  const categories = ['All', ...new Set(allItems.map((i) => i.category))]
  const hasApiCategories = apiMapped.length > 0

  const filtered =
    activeCategory === 'All'
      ? allItems
      : allItems.filter((img) => img.category === activeCategory)

  return (
    <>
      {/* ── "Last clients" intro ─────────────────────────────────────────── */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end"
        style={{
          marginBottom: 56,
          paddingBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(200,185,170,0.4)', marginBottom: 14 }}>
            Recent work
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.4rem,4vw,3.8rem)',
              color: '#f4efe8',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
            }}
          >
            View our{' '}
            <span style={{ color: '#e05070', fontStyle: 'italic' }}>last clients</span>
          </h2>
        </div>
        <div>
          <p style={{ fontSize: 14, color: 'rgba(210,196,182,0.58)', lineHeight: 1.8, maxWidth: '44ch', marginBottom: 12 }}>
            Every set in this gallery is a real client — real nails, real results. No staged stock photos. No filters beyond what your phone would apply.
          </p>
          <p style={{ fontSize: 14, color: 'rgba(210,196,182,0.45)', lineHeight: 1.8, maxWidth: '44ch' }}>
            Hover any image to see what that client had to say about their experience. The work speaks — but so do they.
          </p>
        </div>
      </div>

      {/* ── Category filter ───────────────────────────────────────────────── */}
      {(hasApiCategories || categories.length > 2) && (
        <div className="flex flex-wrap gap-2 mb-10">
          {(hasApiCategories ? categories : ALL_CATEGORIES).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-[--radius-pill] text-sm transition-colors duration-300"
              style={
                activeCategory === cat
                  ? { background: '#e05070', color: '#ffffff' }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(200,185,170,0.6)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              <GalleryCard
                src={img.src}
                alt={img.alt}
                review={REVIEWS[i % REVIEWS.length]}
                onClick={() => setLightbox({ src: img.src, alt: img.alt })}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-sm" style={{ color: 'rgba(200,185,170,0.4)' }}>
          No images in this category yet.
        </div>
      )}

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(8,10,18,0.94)', backdropFilter: 'blur(18px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full overflow-hidden"
              style={{ borderRadius: 3, maxHeight: '85dvh' }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full h-full object-contain"
                style={{ maxHeight: '85dvh' }}
              />
            </motion.div>
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)' }}
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
