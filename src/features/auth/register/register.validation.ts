import { z } from 'zod'

export const registerValidation = z.object({
  symbol: z.string().min(3).max(14),
  faction: z.string(),
  email: z
    .string()
    .trim()
    .email()
    .optional()
    .or(z.literal('').transform(() => undefined)),
})

export type RegisterSchema = z.infer<typeof registerValidation>
