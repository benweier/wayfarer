import { useMutation, useQueryClient } from '@tanstack/react-query'
import produce from 'immer'
import { createShipDock, createShipOrbit, createShipScanWaypoint } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'

const updateShipNavStatus = produce<SpaceTradersResponse<ShipResponse>, [string]>((draft, state) => {
  draft.data.nav.status = state
})

const updateShipInFleetNavStatus = produce<SpaceTradersResponse<ShipResponse[]>, [number, string]>(
  (draft, index, state) => {
    draft.data[index].nav.status = state
  },
)

export const Orbit = ({ symbol }: { symbol: string }) => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['ship', symbol],
    mutationFn: (symbol: string) => createShipOrbit({ path: symbol }),
    onMutate: (symbol) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', symbol] })

      // Snapshot the previous value
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', symbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((s) => s.symbol === symbol) ?? -1

      // Optimistically update to the new value
      if (ship) client.setQueryData(['ship', symbol], updateShipNavStatus(ship, 'IN_ORBIT'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'IN_ORBIT'))

      // Return a context object with the snapshotted value
      return { ship, ships }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, symbol, context) => {
      client.setQueryData(['ships'], context?.ships)
      client.setQueryData(['ship', symbol], context?.ship)
    },
    // Always refetch after error or success:
    onSettled: (symbol) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', symbol] })
    },
  })

  return <button onClick={() => mutate(symbol)}>Orbit</button>
}

export const Dock = ({ symbol }: { symbol: string }) => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['ship', symbol],
    mutationFn: (symbol: string) => createShipDock({ path: symbol }),
    onMutate: (symbol) => {
      // Snapshot the previous value
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', symbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((s) => s.symbol === symbol) ?? -1

      // Optimistically update to the new value
      if (ship) client.setQueryData(['ship', symbol], updateShipNavStatus(ship, 'DOCKED'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'DOCKED'))

      // Return a context object with the snapshotted value
      return { ship, ships }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, symbol, context) => {
      client.setQueryData(['ship', symbol], context?.ship)
      client.setQueryData(['ships'], context?.ships)
    },
    // Always refetch after error or success:
    onSettled: (symbol) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', symbol] })
    },
  })

  return <button onClick={() => mutate(symbol)}>Dock</button>
}

export const ScanWaypoints = ({ symbol }: { symbol: string }) => {
  const { mutate } = useMutation({
    mutationKey: ['ship-scan-waypoints', symbol],
    mutationFn: (id: string) => createShipScanWaypoint({ path: id }),
  })

  return <button onClick={() => mutate(symbol)}>Scan</button>
}
