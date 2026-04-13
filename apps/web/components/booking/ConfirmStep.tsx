'use client'

import { useState } from 'react'
import { useBookingStore } from '@/store/bookingStore'
import { useMutation } from '@tanstack/react-query'
import { createBooking } from '@/lib/api'
import { formatPrice, formatDuration, formatDate, formatTime } from '@/lib/utils'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

export function ConfirmStep() {
  const router = useRouter()
  const { selectedService, selectedStaff, selectedDate, selectedTime, notes, setNotes, setStep, reset } =
    useBookingStore()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      reset()
      router.push('/dashboard')
    },
  })

  function handleConfirm() {
    if (!selectedService || !selectedDate || !selectedTime) return

    const [hours, minutes] = selectedTime.split(':').map(Number)
    const scheduledAt = new Date(selectedDate)
    scheduledAt.setHours(hours, minutes, 0, 0)

    mutate({
      serviceId: selectedService.id,
      staffId: selectedStaff?.id,
      scheduledAt: scheduledAt.toISOString(),
      notes: notes || undefined,
    })
  }

  if (!selectedService || !selectedDate || !selectedTime) {
    return (
      <div className="text-center py-12 text-muted text-sm">
        Something went wrong. Please start over.
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-noir mb-2">Confirm your booking</h2>
      <p className="text-sm text-muted mb-8">Review the details before confirming.</p>

      <div className="rounded-[--radius-card] border border-taupe/20 divide-y divide-taupe/15 mb-6">
        <div className="p-5 flex justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.1em] text-taupe">Service</p>
          <div className="text-right">
            <p className="text-sm font-medium text-noir">{selectedService.name}</p>
            <p className="text-xs text-muted">{formatDuration(selectedService.duration)}</p>
          </div>
        </div>
        <div className="p-5 flex justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.1em] text-taupe">Date & Time</p>
          <div className="text-right">
            <p className="text-sm font-medium text-noir">
              {format(selectedDate, 'EEE, MMM d')} at {selectedTime}
            </p>
          </div>
        </div>
        <div className="p-5 flex justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.1em] text-taupe">Artist</p>
          <p className="text-sm font-medium text-noir">
            {selectedStaff
              ? `${selectedStaff.firstName} ${selectedStaff.lastName}`
              : 'Any available'}
          </p>
        </div>
        <div className="p-5 flex justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.1em] text-taupe">Price</p>
          <p className="font-display text-xl text-noir">{formatPrice(selectedService.price)}</p>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block text-xs uppercase tracking-[0.12em] text-taupe mb-2">
          Notes <span className="text-taupe/50 normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Any requests, allergies, or information we should know..."
          className="w-full bg-cream-dark border border-taupe/25 focus:border-taupe/60 rounded-[--radius-card-inner] px-4 py-3 text-sm text-noir placeholder-taupe/50 outline-none resize-none transition-colors duration-300"
        />
      </div>

      {isError && (
        <p className="mb-4 text-xs text-accent">
          {error instanceof Error ? error.message : 'Booking failed. Please try again.'}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setStep('datetime')}
          className="flex-1 py-3 border border-taupe/25 rounded-[--radius-pill] text-sm text-charcoal hover:bg-cream-dark transition-colors duration-300"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={isPending}
          className="flex-1 py-3 bg-noir text-cream rounded-[--radius-pill] text-sm font-medium hover:bg-charcoal transition-colors duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Booking...' : 'Confirm booking'}
        </button>
      </div>
    </div>
  )
}
