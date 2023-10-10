import { z } from 'zod'

export const registerSchema = z.object({
  symbol: z.string().optional(),
})
