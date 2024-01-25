import { createFileRoute, defer } from '@tanstack/react-router'
import { meta } from '@/routes/dashboard/dashboard-layout.meta'
import { getShipListQuery } from '@/services/api/spacetraders'

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const ships = context.client.ensureQueryData(getShipListQuery())

    return {
      ships: defer(ships),
    }
  },
})
