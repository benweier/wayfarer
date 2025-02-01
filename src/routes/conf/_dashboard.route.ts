import { createFileRoute, defer } from '@tanstack/react-router'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'

export const Route = createFileRoute('/_dashboard')({
  loader: ({ context }) => {
    const ships = context.client.ensureQueryData(getShipListQuery())

    return {
      ships: defer(ships),
    }
  },
})
