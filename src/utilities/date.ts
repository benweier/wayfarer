export const relativeTime = (date: Date) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  const now = new Date().getTime()
  const diffMs = now - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  switch (true) {
    case diffSec < 5:
      return 'right now'
    case diffMin < 1:
      return `a few seconds ago`
    case diffHour < 1:
      return rtf.format(-diffMin, 'minute')
    case diffHour < 24:
      return rtf.format(-diffHour, 'hour')
    default:
      return rtf.format(-diffDay, 'day')
  }
}
