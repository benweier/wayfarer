import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipDock, createShipNavigate, createShipOrbit } from '@/services/api/spacetraders'
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

export const Orbit = ({ shipID }: { shipID: string }) => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['ship', shipID, 'orbit'],
    mutationFn: (shipID: string) => createShipOrbit({ path: shipID }),
    onMutate: (shipID) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((s) => s.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNavStatus(ship, 'IN_ORBIT'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'IN_ORBIT'))

      return { ship, ships }
    },
    onError: (_err, shipID, context) => {
      client.setQueryData(['ships'], context?.ships)
      client.setQueryData(['ship', shipID], context?.ship)
    },
    onSettled: (shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return (
    <button className="btn btn-sm" onClick={() => mutate(shipID)}>
      Orbit
    </button>
  )
}

export const Dock = ({ shipID }: { shipID: string }) => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['ship', shipID, 'dock'],
    mutationFn: (shipID: string) => createShipDock({ path: shipID }),
    onMutate: (shipID) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((s) => s.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNavStatus(ship, 'DOCKED'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'DOCKED'))

      return { ship, ships }
    },
    onError: (_err, shipID, context) => {
      client.setQueryData(['ship', shipID], context?.ship)
      client.setQueryData(['ships'], context?.ships)
    },
    onSettled: (shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return (
    <button className="btn btn-sm" onClick={() => mutate(shipID)}>
      Dock
    </button>
  )
}

export const Navigate = ({ shipID, waypointID }: { shipID: string; waypointID: string }) => {
  const { mutate } = useMutation({
    mutationKey: ['ship', shipID, 'navigate', waypointID],
    mutationFn: ({ shipID, waypointID }: { shipID: string; waypointID: string }) =>
      createShipNavigate({ path: shipID, payload: { waypointID } }),
  })

  return (
    <button className="btn btn-sm" onClick={() => mutate({ shipID, waypointID })}>
      Navigate
    </button>
  )
}
