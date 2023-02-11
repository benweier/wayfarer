import { z } from 'zod'

export const validation = z.object({
  symbol: z.string().trim().min(4).max(8),
  token: z.string().trim().min(1),
})

export type LoginSchema = z.infer<typeof validation>
