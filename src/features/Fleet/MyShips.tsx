import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Modal } from '@/components/Modal'
import { ROUTES } from '@/config/routes'
import { createShipScanWaypoint, getShipsList } from '@/services/api/spacetraders'
import { SpaceTradersError } from '@/services/api/spacetraders/core'
import { STATUS_CODES, isHttpError } from '@/services/http'
import { useShipStore } from '@/services/store/ship'
import { CooldownResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { Ship } from './Ship'

export const MyShips = () => {
  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
  })

  if (!isSuccess) return null

  const ships = data.data

  return (
    <div className={cx('grid gap-1', { 'opacity-30': isFetching })}>
      <div
        className={cx('absolute inset-0 backdrop-blur-xs transition-opacity duration-100 ease-in-out', {
          'pointer-events-none opacity-0': !isFetching,
          'pointer-events-auto opacity-100': isFetching,
        })}
      />
      {ships.map((ship) => (
        <Ship key={ship.symbol} ship={ship} />
      ))}
    </div>
  )
}

const ScanWaypoints = ({ shipID }: { shipID: string }) => {
  const setCooldown = useShipStore((state) => state.setCooldown)
  const { mutate, isSuccess, data } = useMutation({
    mutationKey: ['ship', shipID, 'scan'],
    mutationFn: (shipID: string) => createShipScanWaypoint({ path: shipID }),
    onSuccess: (response, shipID) => {
      setCooldown(shipID, response.data.cooldown)
    },
    onError: async (err, shipID) => {
      if (!isHttpError(err, STATUS_CODES.CONFLICT)) return

      try {
        const cooldown: SpaceTradersError<{ cooldown: CooldownResponse }> = await err.json()
        if (cooldown.error?.data.cooldown) setCooldown(shipID, cooldown.error.data.cooldown)
      } catch (err) {
        //
      }
    },
  })

  const waypoints = isSuccess ? data?.data.waypoints : []

  return (
    <Modal
      isOpen={isSuccess}
      trigger={
        <button className="btn btn-sm" onClick={() => mutate(shipID)}>
          Scan
        </button>
      }
    >
      <div className="grid gap-4">
        <div className="text-lg font-bold">
          Waypoints <span className="font-light">({waypoints.length})</span>
        </div>

        <div className="grid gap-2">
          {waypoints.map((waypoint) => (
            <div key={waypoint.symbol}>
              <Link to={`${ROUTES.SYSTEMS}/${waypoint.systemSymbol}/waypoint/${waypoint.symbol}`}>
                {waypoint.symbol}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
