import * as v from 'valibot'

export const RegisterSchema = v.object({
  symbol: v.pipe(v.string(), v.trim(), v.minLength(3), v.maxLength(14)),
  faction: v.string(),
  email: v.union([
    v.optional(v.pipe(v.string(), v.trim(), v.email())),
    v.pipe(
      v.literal(''),
      v.transform(() => undefined),
    ),
  ]),
})

export type RegisterSchema = v.InferInput<typeof RegisterSchema>
