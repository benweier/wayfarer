import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { FleetStore } from '@/context/fleet.context'
import { SystemStore } from '@/context/system.context'
import { SystemDetail } from '@/features/system/detail'
import { SystemTabs } from '@/features/system/tabs'

export const SystemViewComponent = () => {
  const { systemSymbol } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">
        System: <span className="whitespace-nowrap font-normal">{systemSymbol}</span>
      </h1>

      {systemSymbol && (
        <QuerySuspenseBoundary>
          <FleetStore>
            <SystemStore systemSymbol={systemSymbol}>
              <SystemDetail>
                <SystemTabs />
              </SystemDetail>
            </SystemStore>
          </FleetStore>
        </QuerySuspenseBoundary>
      )}
    </div>
  )
}

export const Route = withQSB()(SystemViewComponent)
