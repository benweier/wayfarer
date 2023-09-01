import { useQueryClient } from '@tanstack/react-query'
import { startTransition, useEffect, useMemo, useState } from 'react'
import { updateShipInFleetNavStatus, updateShipNavStatus } from '@/features/ship/actions'
import { getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'

export const useShipTransit = ({ symbol, nav }: ShipResponse) => {
  const client = useQueryClient()
  const [lastUpdate, forceUpdate] = useState(() => Date.now())
  const arrival = useMemo(() => new Date(nav.route.arrival), [nav.route.arrival])
  const departed = useMemo(() => new Date(nav.route.departureTime), [nav.route.departureTime])
  const totalSeconds = (arrival.getTime() - departed.getTime()) / 1000
  const remainingSeconds = Math.floor(Math.max(0, arrival.getTime() - lastUpdate) / 1000)
  const progress = Math.round((100 / totalSeconds) * (totalSeconds - remainingSeconds))

  useEffect(() => {
    if (remainingSeconds === 0) return

    const timeout = setTimeout(() => {
      startTransition(() => {
        forceUpdate(Date.now())
      })
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [arrival, remainingSeconds])

  useEffect(() => {
    if (remainingSeconds === 0 && nav.status === 'IN_TRANSIT') {
      void client.cancelQueries({ queryKey: [{ scope: 'ships' }] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(
        getShipByIdQuery.getQueryKey({ shipSymbol: symbol }),
      )
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === symbol) ?? -1

      if (ship) {
        client.setQueryData(getShipByIdQuery.getQueryKey({ shipSymbol: symbol }), updateShipNavStatus(ship, 'IN_ORBIT'))
      }
      if (ships && index !== -1) {
        client.setQueryData(getShipListQuery.getQueryKey(), updateShipInFleetNavStatus(ships, index, 'IN_ORBIT'))
      }
    }
  }, [client, nav.status, remainingSeconds, symbol])

  return { remainingSeconds, totalSeconds, arrival, departed, progress }
}
