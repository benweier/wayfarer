import {
  type InferInput,
  email,
  literal,
  maxLength,
  minLength,
  object,
  optional,
  pipe,
  string,
  transform,
  trim,
  union,
} from 'valibot'

export const RegisterSchema = object({
  symbol: pipe(string(), minLength(3), maxLength(14)),
  faction: string(),
  email: union([
    optional(pipe(string(), trim(), email())),
    pipe(
      literal(''),
      transform(() => undefined),
    ),
  ]),
})

export type RegisterSchema = InferInput<typeof RegisterSchema>
