import { i18n } from '@/services/i18n'
import { createFileRoute, defer } from '@tanstack/react-router'
import { getStatusQuery } from '@/services/api/spacetraders/status'

export const Route = createFileRoute('/_dashboard/leaderboard')({
  loader: ({ context }) => {
    const status = context.client.ensureQueryData(getStatusQuery())

    return {
      status: defer(status),
    }
  },
  head: () => {
    return {
      meta: [{ title: i18n.t('title_template', { title: 'leaderboard.title', ns: 'meta' }) }],
    }
  },
})
