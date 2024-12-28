import { createInstance } from 'i18next'
import languageDetector from 'i18next-browser-languagedetector'
import backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { sentry } from '@/services/sentry'

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
      'validation',
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
i18n.services.formatter?.addCached('number', (lng, opts?: Intl.NumberFormatOptions) => {
  const formatter = new Intl.NumberFormat(lng, opts)

  return (val: number) => formatter.format(val)
})
i18n.services.formatter?.addCached('relativeTime', (lng?: string, opts: Intl.RelativeTimeFormatOptions = { numeric: 'auto' }) => {
  const rtf = new Intl.RelativeTimeFormat(lng, opts)

  return (value: number | Date) => {
    const date = new Date(value)
    const now = new Date().getTime()
    const diffMs = now - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    switch (true) {
      case diffSec < 5:
        return i18n.t('general.right_now')
      case diffMin < 1:
        return i18n.t('general.seconds_ago')
      case diffHour < 1:
        return rtf.format(-diffMin, 'minute')
      case diffHour < 24:
        return rtf.format(-diffHour, 'hour')
      default:
        return rtf.format(-diffDay, 'day')
    }
  }
})
i18n.services.formatter?.addCached('absoluteDateTime', (lng) => {
  const dtf = new Intl.DateTimeFormat(lng, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    second: '2-digit',
  })

  return (value: number | Date) => {
    const date = new Date(value)
    const [day, , month, , year, , hour, , minute, , second] = dtf.formatToParts(date)

    return `${year.value}.${month.value}.${day.value} ${hour.value}:${minute.value}:${second.value}`
  }
})
