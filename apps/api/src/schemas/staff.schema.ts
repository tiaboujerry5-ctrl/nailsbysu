import { z } from 'zod'

export const createStaffSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  bio: z.string().optional(),
  photoUrl: z.string().url().optional(),
  specialties: z.array(z.string()).optional().default([]),
  isActive: z.boolean().optional().default(true),
})

export const updateStaffSchema = createStaffSchema.partial()

export type CreateStaffInput = z.infer<typeof createStaffSchema>
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>
