import {
  type Input,
  email,
  literal,
  maxLength,
  minLength,
  object,
  optional,
  string,
  toTrimmed,
  transform,
  union,
} from 'valibot'

export const RegisterSchema = object({
  symbol: string([minLength(3), maxLength(14)]),
  faction: string(),
  email: union([optional(string([toTrimmed(), email()])), transform(literal(''), () => undefined)]),
})

export type RegisterSchema = Input<typeof RegisterSchema>
