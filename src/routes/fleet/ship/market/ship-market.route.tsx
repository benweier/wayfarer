import { withQSB } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'

const ShipMarketRouteComponent = () => {
  const ship = useShipResponse()

  return <>{ship.symbol}</>
}

export const Route = withQSB()(ShipMarketRouteComponent)
