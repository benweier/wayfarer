import { z } from 'zod'

export const loginValidation = z.object({
  symbol: z.string().trim().optional(),
  token: z.string().trim().min(1, { message: 'Access Token is required' }),
})

export type LoginSchema = z.infer<typeof loginValidation>
