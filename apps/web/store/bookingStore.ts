'use client'

import { create } from 'zustand'
import type { Service, StaffMember } from '@/lib/api'

type BookingStep = 'service' | 'staff' | 'datetime' | 'confirm' | 'payment'

interface BookingStore {
  step: BookingStep
  selectedService: Service | null
  selectedStaff: StaffMember | null
  selectedDate: Date | null
  selectedTime: string | null
  notes: string

  setStep: (step: BookingStep) => void
  setService: (service: Service) => void
  setStaff: (staff: StaffMember | null) => void
  setDate: (date: Date) => void
  setTime: (time: string) => void
  setNotes: (notes: string) => void
  reset: () => void
}

const INITIAL_STATE = {
  step: 'service' as BookingStep,
  selectedService: null,
  selectedStaff: null,
  selectedDate: null,
  selectedTime: null,
  notes: '',
}

export const useBookingStore = create<BookingStore>((set) => ({
  ...INITIAL_STATE,
  setStep: (step) => set({ step }),
  setService: (service) => set({ selectedService: service, step: 'staff' }),
  setStaff: (staff) => set({ selectedStaff: staff, step: 'datetime' }),
  setDate: (date) => set({ selectedDate: date }),
  setTime: (time) => set({ selectedTime: time }),
  setNotes: (notes) => set({ notes }),
  reset: () => set(INITIAL_STATE),
}))
