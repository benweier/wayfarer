import { useSuspenseQuery } from '@tanstack/react-query'
import { ShipIcon } from '@/components/icons'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { useShipResponse } from '@/context/ship.context'
import * as ShipActions from '@/features/ship/actions'
import { getWaypointListQuery } from '@/services/api/spacetraders'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitNavigate = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipResponse()

  return (
    <Modal size="md" closeable trigger={<Modal.Trigger>{trigger}</Modal.Trigger>}>
      <div className="grid gap-8">
        <h3 className="text-title">
          Navigate Ship: <span className="font-normal">{ship.symbol}</span>
        </h3>
        <QuerySuspenseBoundary
          fallback={
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="mx-auto h-3 w-4/5 animate-pulse rounded-full bg-white/5" />
              ))}
            </div>
          }
        >
          <Navigate ship={ship} />
        </QuerySuspenseBoundary>
      </div>
    </Modal>
  )
}

const Navigate = ({ ship }: { ship: ShipResponse }) => {
  const { data } = useSuspenseQuery({
    queryKey: getWaypointListQuery.getQueryKey({ systemSymbol: ship.nav.systemSymbol }),
    queryFn: getWaypointListQuery.queryFn,
  })
  const waypoints = data.data

  return (
    <div className="grid gap-3">
      {waypoints.map((waypoint) => (
        <div key={waypoint.symbol} className="flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold">{waypoint.symbol}</div>
            <div className="flex flex-row gap-2">
              <WaypointTag type={waypoint.type}>{WAYPOINT_TYPE.get(waypoint.type) ?? waypoint.type}</WaypointTag>
              <div className="text-xs font-light">
                ({waypoint.x}, {waypoint.y})
              </div>
            </div>
          </div>
          <ShipActions.Navigate ship={ship} waypointSymbol={waypoint.symbol}>
            {ship.nav.waypointSymbol !== waypoint.symbol
              ? (props) => (
                  <button className="btn btn-icon btn-outline btn-confirm" {...props}>
                    <ShipIcon id="navigate" className="h-4 w-4" aria-hidden />
                    <span className="sr-only">
                      Navigate ship {ship.symbol} to waypoint {waypoint.symbol}
                    </span>
                  </button>
                )
              : (props) => (
                  <button className="btn btn-icon" {...props} disabled>
                    <ShipIcon id="pin" className="h-4 w-4" aria-hidden />
                    <span className="sr-only">
                      Ship {ship.symbol} is already at waypoint {waypoint.symbol}
                    </span>
                  </button>
                )}
          </ShipActions.Navigate>
        </div>
      ))}
    </div>
  )
}
