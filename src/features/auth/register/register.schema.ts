import { i18n } from '@/services/i18n'
import * as v from 'valibot'

export const RegisterSchema = v.object({
  symbol: v.pipe(v.string(), v.trim(), v.minLength(3), v.maxLength(14)),
  faction: v.string(),
  email: v.optional(
    v.union([v.literal(''), v.pipe(v.string(), v.trim(), v.email())], i18n.t('email', { ns: 'validation' })),
  ),
})

export type RegisterSchema = v.InferOutput<typeof RegisterSchema>

export type RegisterFormFieldValues = v.InferInput<typeof RegisterSchema>
