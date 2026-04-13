import { z } from 'zod'

export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  description: z.string().optional(),
  duration: z.number().int().positive('Duration must be a positive number of minutes'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  isActive: z.boolean().optional().default(true),
})

export const updateServiceSchema = createServiceSchema.partial()

export type CreateServiceInput = z.infer<typeof createServiceSchema>
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>
