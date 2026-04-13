import { z } from 'zod'

export const createBookingSchema = z.object({
  serviceId: z.string().cuid('Invalid service ID'),
  staffId: z.string().cuid('Invalid staff ID').optional(),
  scheduledAt: z.string().datetime('Invalid date format'),
  notes: z.string().max(500).optional(),
})

export const updateBookingStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']),
})

export type CreateBookingInput = z.infer<typeof createBookingSchema>
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>
