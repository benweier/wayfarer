import { useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { useEffect, useMemo } from 'react'
import { ShipNavStatus } from '@/config/spacetraders'
import { useUpdateInterval } from '@/hooks/use-update-interval.hook'
import { getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders/fleet'
import { getWaypointMarketQuery, getWaypointShipyardQuery } from '@/services/api/spacetraders/waypoints'
import { ShipTransitState } from './ship-transit.conf'
import type { ShipResponse } from '@/types/spacetraders'

export const useShipTransit = ({ symbol, nav }: ShipResponse) => {
  const client = useQueryClient()
  const arrival = useMemo(() => new Date(nav.route.arrival), [nav.route.arrival])
  const departed = useMemo(() => new Date(nav.route.departureTime), [nav.route.departureTime])
  const totalSeconds = (arrival.getTime() - departed.getTime()) / 1000
  const remainingSeconds = Math.floor(Math.max(-1, arrival.getTime() - Date.now()) / 1000)
  const progress = Math.min(100, Math.max(0, Math.round((100 / totalSeconds) * (totalSeconds - remainingSeconds))))
  const status = remainingSeconds < 0 ? ShipTransitState.Complete : ShipTransitState.InProgress

  useUpdateInterval(() => {
    return status !== ShipTransitState.Complete
  }, 1000)

  useEffect(() => {
    if (status === ShipTransitState.Complete && nav.status === ShipNavStatus.InTransit) {
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
            draft.data.nav.status = ShipNavStatus.InOrbit
          }),
        )
      }
      if (ships && index !== -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].nav.status = ShipNavStatus.InOrbit
          }),
        )
      }
    }
  }, [client, nav.status, status, symbol])

  return {
    remainingSeconds,
    totalSeconds,
    arrival,
    departed,
    progress,
    status,
  } as const
}
