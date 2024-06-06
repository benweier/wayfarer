import { type InferInput, minLength, object, optional, pipe, string, trim } from 'valibot'

export const LoginSchema = object({
  symbol: optional(pipe(string(), trim())),
  token: pipe(string(), trim(), minLength(1, 'auth.validation.access_token_required')),
})

export type LoginSchema = InferInput<typeof LoginSchema>
