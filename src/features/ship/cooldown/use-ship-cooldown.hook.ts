import { useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { useEffect, useMemo } from 'react'
import { useUpdateInterval } from '@/hooks/use-update-interval.hook'
import { getShipByIdQuery } from '@/services/api/spacetraders/fleet'
import type { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import type { ShipResponse } from '@/types/spacetraders'

export const useShipCooldown = (ship: ShipResponse) => {
  const client = useQueryClient()
  const expiration = useMemo(() => {
    if (ship.cooldown.expiration === undefined) return 0

    return new Date(ship.cooldown.expiration).getTime()
  }, [ship.cooldown.expiration])
  const totalSeconds = ship.cooldown.totalSeconds
  const remainingSeconds = Math.floor(Math.max(-1, expiration - Date.now()) / 1000)
  const progress =
    100 - Math.min(100, Math.max(0, Math.round((100 / totalSeconds) * (totalSeconds - remainingSeconds))))

  const status = remainingSeconds < 0 ? 'complete' : 'in_progress'

  useUpdateInterval(() => {
    return status !== 'complete'
  }, 1000)

  useEffect(() => {
    const now = Date.now()

    if (now > expiration || remainingSeconds < 0) {
      client.setQueryData(
        getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey,
        produce<SpaceTradersResponse<ShipResponse>>((draft) => {
          draft.data.cooldown = { shipSymbol: ship.symbol, totalSeconds: 0, remainingSeconds: 0 }
        }),
      )
    }
  }, [client, expiration, remainingSeconds, ship.symbol])

  return { hasCooldown: status === 'in_progress', remainingSeconds, totalSeconds, expiration, progress }
}
