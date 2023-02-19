import { useMutation, useQueryClient } from '@tanstack/react-query'
import produce from 'immer'
import { createShipDock, createShipOrbit, createShipScanWaypoint } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'

export const Orbit = ({ ship }: { ship: string }) => {
  const client = useQueryClient()
  const { mutate, data } = useMutation({
    mutationKey: ['ship-orbit', ship],
    mutationFn: (id: string) => createShipOrbit({ path: id }),
    onMutate: (id) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', id] })

      // Snapshot the previous value
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', id])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      // Optimistically update to the new value
      client.setQueryData(
        ['ship', id],
        produce(ship, (draft) => {
          if (!draft) return

          draft.data.nav.status = 'IN_ORBIT'

          return draft
        }),
      )

      client.setQueryData(
        ['ships'],
        produce(ships, (draft) => {
          if (!draft) return

          const index = draft.data.findIndex((s) => s.symbol === id)
          draft.data[index].nav.status = 'IN_ORBIT'

          return draft
        }),
      )

      // Return a context object with the snapshotted value
      return { ship }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, id, context) => {
      client.setQueryData(['ship', id], context?.ship)
    },
    // Always refetch after error or success:
    onSettled: (ship) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', ship] })
    },
  })

  return (
    <button
      onClick={() => {
        mutate(ship)
      }}
    >
      Orbit
    </button>
  )
}

export const Dock = ({ ship }: { ship: string }) => {
  const client = useQueryClient()
  const { mutate, data } = useMutation({
    mutationKey: ['ship-dock', ship],
    mutationFn: (id: string) => createShipDock({ path: id }),
    onMutate: (id) => {
      // Snapshot the previous value
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', id])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      // Optimistically update to the new value
      client.setQueryData(
        ['ship', id],
        produce(ship, (draft) => {
          if (!draft) return

          draft.data.nav.status = 'DOCKED'

          return draft
        }),
      )

      client.setQueryData(
        ['ships'],
        produce(ships, (draft) => {
          if (!draft) return

          const index = draft.data.findIndex((s) => s.symbol === id)
          draft.data[index].nav.status = 'DOCKED'

          return draft
        }),
      )

      // Return a context object with the snapshotted value
      return { ship }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, id, context) => {
      client.setQueryData(['ship', id], context?.ship)
    },
    // Always refetch after error or success:
    onSettled: (ship) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', ship] })
    },
  })

  return (
    <button
      onClick={() => {
        mutate(ship)
      }}
    >
      Dock
    </button>
  )
}

export const ScanWaypoints = ({ ship }: { ship: string }) => {
  const { mutate, data } = useMutation({
    mutationKey: ['ship-scan-waypoints', ship],
    mutationFn: (id: string) => createShipScanWaypoint({ path: id }),
  })

  return (
    <button
      onClick={() => {
        mutate(ship)
      }}
    >
      Scan
    </button>
  )
}
