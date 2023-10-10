import { z } from 'zod'

export const loginSchema = z.object({
  symbol: z.string().optional(),
  token: z.string().optional(),
})
