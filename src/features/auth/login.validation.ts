import { z } from 'zod'

export const loginValidation = z.object({
  token: z.string().trim().min(1),
})

export type LoginSchema = z.infer<typeof loginValidation>
