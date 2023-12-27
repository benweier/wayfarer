import { useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { startTransition, useEffect, useMemo, useState } from 'react'
import { getShipByIdQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'

export const useShipCooldown = (ship: ShipResponse) => {
  const client = useQueryClient()
  const [lastUpdate, forceUpdate] = useState(() => Date.now())
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const expiration = useMemo(() => {
    if (ship.cooldown.expiration === undefined) return 0

    return new Date(ship.cooldown.expiration).getTime()
  }, [ship.cooldown.expiration])
  const totalSeconds = ship.cooldown.totalSeconds
  const remainingSeconds = Math.floor(Math.max(0, expiration - Date.now()) / 1000)

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
  }, [lastUpdate, remainingSeconds])

  useEffect(() => {
    const now = Date.now()

    if (now > expiration || remainingSeconds === 0) {
      client.setQueryData(
        getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey,
        produce<SpaceTradersResponse<ShipResponse>>((draft) => {
          draft.data.cooldown = { shipSymbol: ship.symbol, totalSeconds: 0, remainingSeconds: 0 }
        }),
      )
    }
  }, [client, expiration, remainingSeconds, ship.symbol])

  return { hasCooldown, remainingSeconds, totalSeconds, expiration }
}
