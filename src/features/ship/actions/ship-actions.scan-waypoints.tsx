import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Modal } from '@/components/modal'
import { ROUTES } from '@/config/routes'
import { createShipScanWaypointsMutation } from '@/services/api/spacetraders'
import { type SpaceTradersError } from '@/services/api/spacetraders/core'
import { STATUS_CODES, isHttpError } from '@/services/http'
import { useShipCooldownStore } from '@/store/ship'
import { type CooldownResponse } from '@/types/spacetraders'

export const ScanWaypoints = ({ shipSymbol }: { shipSymbol: string }) => {
  const setCooldown = useShipCooldownStore((state) => state.setCooldown)
  const { mutate, isSuccess, data } = useMutation({
    mutationKey: createShipScanWaypointsMutation.getMutationKey({ shipSymbol }),
    mutationFn: createShipScanWaypointsMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      setCooldown(shipSymbol, response.data.cooldown)
    },
    onError: async (err, { shipSymbol }) => {
      if (!isHttpError(err, STATUS_CODES.CONFLICT)) return

      try {
        const cooldown: SpaceTradersError<{ cooldown: CooldownResponse }> = await err.json()

        if (cooldown.error?.data.cooldown) setCooldown(shipSymbol, cooldown.error.data.cooldown)
      } catch (err) {
        //
      }
    },
  })
  const waypoints = isSuccess ? data.data.waypoints : []

  return (
    <Modal
      isOpen={isSuccess}
      trigger={
        <button
          className="btn btn-sm"
          onClick={() => {
            mutate({ shipSymbol })
          }}
        >
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
