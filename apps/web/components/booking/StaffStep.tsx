'use client'

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useBookingStore } from '@/store/bookingStore'
import { fetchStaff, type StaffMember } from '@/lib/api'
import { cn } from '@/lib/utils'

export function StaffStep() {
  const { data: staff, isLoading } = useQuery({
    queryKey: ['staff'],
    queryFn: fetchStaff,
  })

  const setStaff = useBookingStore((s) => s.setStaff)
  const selectedStaff = useBookingStore((s) => s.selectedStaff)
  const setStep = useBookingStore((s) => s.setStep)

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-cream-dark animate-pulse rounded-[--radius-card]" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-noir mb-2">Choose an artist</h2>
      <p className="text-sm text-muted mb-8">
        Pick your preferred nail artist, or skip to let us assign one.
      </p>

      <div className="space-y-3">
        {/* No preference option */}
        <button
          onClick={() => setStaff(null)}
          className={cn(
            'w-full text-left p-5 rounded-[--radius-card] border transition-all duration-300',
            selectedStaff === null
              ? 'border-noir bg-noir/5'
              : 'border-taupe/20 bg-cream hover:border-taupe/50 hover:bg-cream-dark'
          )}
        >
          <p className="font-medium text-noir">No preference</p>
          <p className="text-xs text-muted mt-0.5">We&apos;ll assign the best available artist</p>
        </button>

        {staff?.map((member: StaffMember) => (
          <button
            key={member.id}
            onClick={() => setStaff(member)}
            className={cn(
              'w-full text-left p-5 rounded-[--radius-card] border transition-all duration-300',
              selectedStaff?.id === member.id
                ? 'border-noir bg-noir/5'
                : 'border-taupe/20 bg-cream hover:border-taupe/50 hover:bg-cream-dark'
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-blush/40 shrink-0">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={`${member.firstName} ${member.lastName}`}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-lg text-taupe">{member.firstName[0]}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium text-noir">
                  {member.firstName} {member.lastName}
                </p>
                {member.specialties.length > 0 && (
                  <p className="text-xs text-muted mt-0.5">{member.specialties.join(' · ')}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setStep('service')}
          className="flex-1 py-3 border border-taupe/25 rounded-[--radius-pill] text-sm text-charcoal hover:bg-cream-dark transition-colors duration-300"
        >
          Back
        </button>
        <button
          onClick={() => setStep('datetime')}
          className="flex-1 py-3 bg-noir text-cream rounded-[--radius-pill] text-sm hover:bg-charcoal transition-colors duration-300 active:scale-[0.98]"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
