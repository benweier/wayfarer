import { meta } from '@/routes/fleet/fleet-route.meta'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'
import { createFileRoute, defer } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_authenticated/fleet/')({
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const ships = context.client.ensureQueryData(getShipListQuery())

    return {
      ships: defer(ships),
    }
  },
  staleTime: Number.POSITIVE_INFINITY,
  gcTime: Number.POSITIVE_INFINITY,
})
