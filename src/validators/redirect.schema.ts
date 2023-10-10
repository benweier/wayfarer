import { z } from 'zod'

export const redirectSchema = z.object({
  redirect: z.object({
    destination: z.string(),
  }),
})
