import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { updateShipInFleetNavStatus, updateShipNavStatus } from '@/components/Ship/Actions'
import { useShipContext } from '@/context/Ship'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'

export const useRouteTransit = () => {
  const client = useQueryClient()
  const { symbol, nav } = useShipContext((ship) => ({
    symbol: ship.symbol,
    nav: ship.nav,
  }))
  const arrival = useMemo(() => new Date(nav.route.arrival), [nav.route.arrival])
  const departed = useMemo(() => new Date(nav.route.departureTime), [nav.route.departureTime])
  const totalSeconds = Math.max(0, arrival.getTime() - departed.getTime())
  const [remainingSeconds, setRemainingSeconds] = useState(() => Math.max(0, arrival.getTime() - Date.now()))

  useEffect(() => {
    if (remainingSeconds === 0) return

    const timeout = setTimeout(() => {
      const seconds = Math.floor(Math.max(0, arrival.getTime() - Date.now()) / 1000)
      setRemainingSeconds(seconds)
    }, 1000 + remainingSeconds * 1000)

    return () => clearTimeout(timeout)
  }, [arrival, remainingSeconds])

  useEffect(() => {
    if (remainingSeconds === 0 && nav.status === 'IN_TRANSIT') {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', symbol] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', symbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === symbol) ?? -1

      if (ship) client.setQueryData(['ship', symbol], updateShipNavStatus(ship, 'IN_ORBIT'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'IN_ORBIT'))
    }
  }, [client, nav.status, remainingSeconds, symbol])

  return { remainingSeconds, totalSeconds, arrival, departed }
}
