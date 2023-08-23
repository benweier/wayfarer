import { withQSB } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'

const ShipMountsRouteComponent = () => {
  const ship = useShipResponse()

  return <>{ship.symbol}</>
}

export const Route = withQSB()(ShipMountsRouteComponent)
