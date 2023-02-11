import { z } from 'zod'

export const validation = z.object({
  symbol: z.string().min(4).max(8),
  faction: z.string(),
})

export type RegisterSchema = z.infer<typeof validation>
