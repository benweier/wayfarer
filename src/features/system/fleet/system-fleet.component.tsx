import { useSystemResponse } from '@/context/system.context'
import { ShipListTable } from '@/features/ship/list/ship-list.table'
import { SystemFleetEmpty } from '@/features/system/fleet/system-fleet.empty'
import { getShipListQuery } from '@/services/api/spacetraders'
import type { Meta, SpaceTradersResponse } from '@/services/api/spacetraders/core'
import type { ShipResponse } from '@/types/spacetraders'
import { useSuspenseQuery } from '@tanstack/react-query'

export const SystemFleet = () => {
  const system = useSystemResponse()
  const { data } = useSuspenseQuery({
    ...getShipListQuery(),
    select: (response): SpaceTradersResponse<ShipResponse[], Meta> => ({
      data: response.data.filter((ship) => ship.nav.systemSymbol === system.symbol),
      meta: response.meta,
    }),
  })
  const ships = data.data

  if (ships.length === 0) {
    return <SystemFleetEmpty system={system} />
  }

  return <ShipListTable data={ships.map((ship) => ({ ship }))} />
}
