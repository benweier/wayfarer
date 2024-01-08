import { createInstance } from 'i18next'
import languageDetector from 'i18next-browser-languagedetector'
import backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { sentry } from '@/services/sentry'
import { formatDateTime, formatRelativeTime } from '@/utilities/date.helper'
import { formatNumber } from '@/utilities/number.helper'

export const i18n = createInstance()

void i18n
  .use(backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en'],
    fallbackLng: 'en',
    load: 'languageOnly',
    ns: [
      'common',
      'meta',
      'spacetraders.contract_type',
      'spacetraders.crew_rotation',
      'spacetraders.engine_type',
      'spacetraders.faction_trait',
      'spacetraders.flight_mode',
      'spacetraders.frame_type',
      'spacetraders.module_type',
      'spacetraders.mount_type',
      'spacetraders.nav_status',
      'spacetraders.reactor_type',
      'spacetraders.ship_type',
      'spacetraders.survey_size',
      'spacetraders.system_type',
      'spacetraders.trade_good',
      'spacetraders.trade_supply',
      'spacetraders.waypoint_modifier',
      'spacetraders.waypoint_trait',
      'spacetraders.waypoint_type',
    ],
    defaultNS: 'common',
    contextSeparator: '|',
    interpolation: {
      escapeValue: false,
    },
    saveMissing: true,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      const msg = `Missing translation key - [${lng.join()}] ${ns}:${key} (${fallbackValue})`

      if (import.meta.env.PROD) {
        sentry.captureMessage(msg, 'warning')
      } else {
        console.warn(msg)
      }
    },
  })
i18n.services.formatter?.add('formatNumber', formatNumber)
i18n.services.formatter?.add('formatRelativeTime', formatRelativeTime)
i18n.services.formatter?.add('formatDateTime', formatDateTime)
