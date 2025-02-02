import * as v from 'valibot'
import { i18n } from '@/services/i18n'

export const RegisterSchema = v.object({
  symbol: v.pipe(v.string(), v.trim(), v.minLength(3), v.maxLength(14)),
  faction: v.string(() => i18n.t('auth.fields.faction.validation.required')),
  email: v.union([v.pipe(v.string(), v.trim(), v.literal('')), v.pipe(v.string(), v.trim(), v.email())], () =>
    i18n.t('email', { ns: 'validation' }),
  ),
})

export type RegisterSchema = v.InferOutput<typeof RegisterSchema>

export type RegisterSchemaInput = v.InferInput<typeof RegisterSchema>
export type RegisterSchemaOutput = v.InferOutput<typeof RegisterSchema>
