import { withQSB } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'

const ShipLoadoutRouteComponent = () => {
  const ship = useShipResponse()

  return (
    <div className="grid gap-4 p-4">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-title">
          Loadout: <span className="font-normal">{ship.symbol}</span>
        </h1>
      </div>
      <div className="grid gap-12"></div>
    </div>
  )
}

export const Route = withQSB()(ShipLoadoutRouteComponent)
