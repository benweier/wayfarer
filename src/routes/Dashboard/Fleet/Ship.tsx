import { useParams } from 'react-router'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { lazy } from '@/utilities/lazy'

const { ViewShip } = lazy(() => import('@/features/Fleet'), ['ViewShip'])

const ShipRoute = () => {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-title p-4">Ship: {id}</h1>
      <div className="grid gap-12 py-6 px-4">
        <QuerySuspenseBoundary>{id && <ViewShip id={id} />}</QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Ship = withQSB()(ShipRoute)
