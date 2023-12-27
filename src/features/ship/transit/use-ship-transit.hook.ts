import { useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { startTransition, useEffect, useMemo, useState } from 'react'
import {
  getShipByIdQuery,
  getShipListQuery,
  getWaypointMarketQuery,
  getWaypointShipyardQuery,
} from '@/services/api/spacetraders'
import { type ShipResponse } from '@/types/spacetraders'

export const useShipTransit = ({ symbol, nav }: ShipResponse) => {
  const client = useQueryClient()
  const [lastUpdate, forceUpdate] = useState(() => Date.now())
  const arrival = useMemo(() => new Date(nav.route.arrival), [nav.route.arrival])
  const departed = useMemo(() => new Date(nav.route.departureTime), [nav.route.departureTime])
  const totalSeconds = (arrival.getTime() - departed.getTime()) / 1000
  const remainingSeconds = Math.floor(Math.max(-1, arrival.getTime() - lastUpdate) / 1000)
  const progress = Math.min(100, Math.max(0, Math.round((100 / totalSeconds) * (totalSeconds - remainingSeconds))))
  const status = remainingSeconds < 0 ? 'complete' : 'in_progress'

  useEffect(() => {
    if (status === 'complete') return

    const timeout = setTimeout(() => {
      startTransition(() => {
        forceUpdate(Date.now())
      })
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [arrival, status, lastUpdate])

  useEffect(() => {
    if (status === 'complete' && nav.status === 'IN_TRANSIT') {
      const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: symbol }).queryKey
      const shipListQueryKey = getShipListQuery().queryKey
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === symbol) ?? -1

      if (ship) {
        client.removeQueries(
          getWaypointMarketQuery({
            systemSymbol: ship.data.nav.systemSymbol,
            waypointSymbol: ship.data.nav.waypointSymbol,
          }),
        )

        client.removeQueries(
          getWaypointShipyardQuery({
            systemSymbol: ship.data.nav.systemSymbol,
            waypointSymbol: ship.data.nav.waypointSymbol,
          }),
        )

        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.nav.status = 'IN_ORBIT'
          }),
        )
      }
      if (ships && index !== -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].nav.status = 'IN_ORBIT'
          }),
        )
      }
    }
  }, [client, nav.status, status, symbol, lastUpdate])

  return {
    remainingSeconds,
    totalSeconds,
    arrival,
    departed,
    progress,
    status,
  } as const
}
