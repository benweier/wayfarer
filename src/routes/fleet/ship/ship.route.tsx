import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ShipDetail } from '@/features/ship/detail'

const ShipRouteComponent = () => {
  const { shipID } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-title">
          Ship: <span className="font-normal">{shipID}</span>
        </h1>
      </div>
      <div className="grid gap-12">
        <QuerySuspenseBoundary>{shipID && <ShipDetail symbol={shipID} />}</QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Route = withQSB()(ShipRouteComponent)
