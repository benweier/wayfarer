import { type Input, minLength, object, optional, string, toTrimmed } from 'valibot'

export const LoginSchema = object({
  symbol: optional(string([toTrimmed()])),
  token: string([toTrimmed(), minLength(1, 'auth.validation.access_token_required')]),
})

export type LoginSchema = Input<typeof LoginSchema>
