import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { View } from '@/features/Ship'

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
        <QuerySuspenseBoundary>{shipID && <View symbol={shipID} />}</QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Ship = withQSB()(ShipRoute)
