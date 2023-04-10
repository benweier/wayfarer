import { z } from 'zod'

export const registerValidation = z.object({
  symbol: z.string().min(3).max(14),
  faction: z.string(),
})

export type RegisterSchema = z.infer<typeof registerValidation>