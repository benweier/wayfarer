import { createInstance } from 'i18next'
import languageDetector from 'i18next-browser-languagedetector'
import backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { formatNumber } from '@/utilities/number'

export const i18n = createInstance()

void i18n
  .use(backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en'],
    fallbackLng: 'en',
    ns: ['common', 'meta'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  })
i18n.services.formatter?.add('formatNumber', (value) => {
  return formatNumber(value)
})
