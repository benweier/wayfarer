import { MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { useShipContext } from '@/context/ship.context'
import * as ShipActions from '@/features/ship/actions'
import { getWaypointsList } from '@/services/api/spacetraders'
import { ShipResponse } from '@/types/spacetraders'
import { ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitNavigate = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipContext()

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
  const { isSuccess, data } = useQuery({
    queryKey: ['system', ship.nav.systemSymbol, 'waypoints'],
    queryFn: () => {
      return getWaypointsList({ path: { systemID: ship.nav.systemSymbol } })
    },
  })

  if (!isSuccess) return null

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
          <ShipActions.Navigate ship={ship} waypointID={waypoint.symbol}>
            {ship.nav.waypointSymbol !== waypoint.symbol
              ? (props) => (
                  <button className="btn btn-confirm btn-outline btn-sm" {...props}>
                    <PaperAirplaneIcon className="h-5 w-5" />
                    <span className="sr-only">
                      Navigate ship {ship.symbol} to waypoint {waypoint.symbol}
                    </span>
                  </button>
                )
              : (props) => (
                  <button disabled className="btn btn-sm" {...props}>
                    <MapPinIcon className="h-5 w-5" />
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
