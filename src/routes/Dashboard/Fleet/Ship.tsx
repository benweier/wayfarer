import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { ViewShip } from '@/features/Fleet'

const ShipRoute = () => {
  const { shipID } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <div className="flex items-center justify-start gap-6">
        <div className="text-title">
          Ship: <span className="font-normal">{shipID}</span>
        </div>
      </div>
      <div className="grid gap-12">
        <QuerySuspenseBoundary>{shipID && <ViewShip symbol={shipID} />}</QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Ship = withQSB()(ShipRoute)
