import { i18n } from '@/services/i18n'
import { createFileRoute, defer } from '@tanstack/react-router'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'

export const Route = createFileRoute('/_dashboard/_authenticated/fleet/')({
  loader: ({ context }) => {
    const ships = context.client.ensureQueryData(getShipListQuery())

    return {
      ships: defer(ships),
    }
  },
  head: () => {
    return {
      meta: [{ title: i18n.t('title_template', { title: 'fleet.title', ns: 'meta' }) }],
    }
  },
  staleTime: Number.POSITIVE_INFINITY,
  gcTime: Number.POSITIVE_INFINITY,
})
