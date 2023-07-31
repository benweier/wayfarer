import { SystemTag } from '@/components/system/tag'
import { SYSTEM_TYPE } from '@/config/constants'
import { useSystemResponse } from '@/context/system.context'

export const SystemDetail = ({ children }: WithChildren) => {
  const system = useSystemResponse()

  return (
    <div key={system.symbol} className="grid gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 gap-y-2">
          <SystemTag type={system.type}>{SYSTEM_TYPE.get(system.type) ?? system.type}</SystemTag>
        </div>
      </div>

      {children}
    </div>
  )
}
