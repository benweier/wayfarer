import { i18n } from '@/services/i18n'
import * as v from 'valibot'

export const LoginSchema = v.object({
  symbol: v.optional(v.pipe(v.string(), v.trim())),
  token: v.pipe(v.string(), v.trim(), v.minLength(1, i18n.t('auth.validation.access_token_required'))),
})

export type LoginSchema = v.InferInput<typeof LoginSchema>
