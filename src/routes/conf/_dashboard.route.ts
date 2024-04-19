import { getShipListQuery } from '@/services/api/spacetraders'
import { createFileRoute, defer } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  loader: ({ context }) => {
    const ships = context.client.ensureQueryData(getShipListQuery())

    return {
      ships: defer(ships),
    }
  },
})
