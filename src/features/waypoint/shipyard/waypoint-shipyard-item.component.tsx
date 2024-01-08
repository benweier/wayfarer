import { type PropsWithChildren } from 'react'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { ShipyardPurchaseShip } from '@/components/shipyard/purchase-ship'
import { useWaypointResponse } from '@/context/waypoint.context'
import { formatNumber } from '@/utilities/number.helper'
import { type WaypointShipyardItemProps } from './waypoint-shipyard.types'

export const WaypointShipyardItem = ({ ship }: PropsWithChildren<WaypointShipyardItemProps>) => {
  const waypoint = useWaypointResponse()

  return (
    <Card className="relative @container/market-item">
      <div className="flex flex-col flex-wrap justify-between gap-4 @lg/market-item:flex-row">
        <div className="min-w-[280px] flex-1 space-y-2">
          <div className="flex flex-row justify-between gap-8">
            <div className="text-lg font-medium">{ship.name}</div>
          </div>
          <div className="text-secondary text-sm">{ship.description}</div>
        </div>

        <div>
          <ShipyardPurchaseShip ship={ship} waypointSymbol={waypoint.symbol}>
            {(props) => (
              <Button intent="danger" kind="outline" className="w-40" {...props}>
                <span className="flex flex-col">
                  <span className="text-xs uppercase">Buy</span>
                  <span className="font-bold">{formatNumber(ship.purchasePrice)}</span>
                </span>
              </Button>
            )}
          </ShipyardPurchaseShip>
        </div>
      </div>
    </Card>
  )
}
