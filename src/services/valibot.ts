import * as v from 'valibot'
import { i18n } from '@/services/i18n'

v.setSpecificMessage(v.minLength, (issue) => {
  return i18n.t('min_length', {
    ns: 'validation',
    issue,
  })
})
v.setSpecificMessage(v.maxLength, (issue) => {
  return i18n.t('max_length', {
    ns: 'validation',
    issue,
  })
})
v.setSpecificMessage(v.email, () => {
  return i18n.t('email', {
    ns: 'validation',
  })
})
