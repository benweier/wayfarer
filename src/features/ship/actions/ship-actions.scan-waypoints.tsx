import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { createShipScanWaypointsMutation } from '@/services/api/spacetraders'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

export const ScanWaypoints = ({ shipSymbol }: { shipSymbol: string }) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationKey: createShipScanWaypointsMutation.getMutationKey({ shipSymbol }),
    mutationFn: createShipScanWaypointsMutation.mutationFn,
  })
  const waypoints = isSuccess ? data.data.waypoints : []

  return (
    <Modal
      isOpen={isSuccess}
      trigger={
        <Button
          size="small"
          onClick={() => {
            mutate({ shipSymbol })
          }}
        >
          Scan
        </Button>
      }
    >
      <div className="grid gap-4">
        <div className="typography-lg font-bold">
          Waypoints <span className="font-light">({waypoints.length})</span>
        </div>

        <div className="grid gap-2">
          {waypoints.map((waypoint) => (
            <div key={waypoint.symbol}>
              <Link
                to="/systems/$systemSymbol/waypoint/$waypointSymbol"
                params={{
                  systemSymbol: waypoint.systemSymbol,
                  waypointSymbol: waypoint.symbol,
                }}
              >
                {waypoint.symbol}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
