import { createInstance } from 'i18next'
import common from '../../public/locales/en/common.json'
import meta from '../../public/locales/en/meta.json'

export const i18n = createInstance()

void i18n.init({
  ns: ['common', 'meta'],
  defaultNS: 'common',
  lng: 'en',
  supportedLngs: ['en'],
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
  resources: {
    en: {
      meta,
      common,
    },
  },
})
