'use client'

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { fetchStaff } from '@/lib/api'

export function StaffSection() {
  const { data: staff, isLoading } = useQuery({
    queryKey: ['staff'],
    queryFn: fetchStaff,
  })

  if (isLoading || !staff?.length) return null

  return (
    <section className="py-24 px-6 md:px-12 bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">The team</p>
        <h2 className="font-display text-5xl md:text-6xl tracking-tight text-noir leading-none mb-16">
          Meet the artists
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="relative aspect-[3/4] rounded-[--radius-card] overflow-hidden bg-blush/30 mb-5">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={`${member.firstName} ${member.lastName}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-taupe/30 flex items-center justify-center">
                      <span className="font-display text-3xl text-taupe">
                        {member.firstName[0]}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <p className="font-display text-2xl text-noir tracking-tight">
                {member.firstName} {member.lastName}
              </p>
              {member.specialties.length > 0 && (
                <p className="text-sm text-muted mt-1">{member.specialties.join(' · ')}</p>
              )}
              {member.bio && (
                <p className="mt-3 text-sm text-charcoal/60 leading-relaxed max-w-[38ch]">
                  {member.bio}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
