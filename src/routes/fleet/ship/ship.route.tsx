import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ShipStore } from '@/context/ship.context'
import { ShipDetail } from '@/features/ship/detail'

const ShipRouteComponent = () => {
  const navigate = useNavigate()
  const { shipSymbol } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-title">
          Ship: <span className="font-normal">{shipSymbol}</span>
        </h1>
      </div>
      <div className="grid gap-12">
        {shipSymbol !== undefined && (
          <QuerySuspenseBoundary>
            <ShipStore shipSymbol={shipSymbol}>
              <ShipDetail />
            </ShipStore>
          </QuerySuspenseBoundary>
        )}
      </div>

      {shipSymbol && (
        <Outlet
          context={{
            onOverlayClose: () => {
              navigate(`/fleet/ship/${shipSymbol}`)
            },
          }}
        />
      )}
    </div>
  )
}

export const Route = withQSB()(ShipRouteComponent)
