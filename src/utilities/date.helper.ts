import { i18n } from '@/services/i18n'
export const formatRelativeTime = (value: number | Date, lng?: string) => {
  const date = new Date(value)
  const rtf = new Intl.RelativeTimeFormat(lng, { numeric: 'auto' })
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

const dateTimeFormatter = new Intl.DateTimeFormat('en-gb', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  hourCycle: 'h23',
  minute: '2-digit',
  second: '2-digit',
})

export const formatDateTime = (value: string | number | Date) => {
  const date = new Date(value)
  const [day, , month, , year, , hour, , minute, , second] = dateTimeFormatter.formatToParts(date)

  return `${year.value}.${month.value}.${day.value} ${hour.value}:${minute.value}:${second.value}`
}
