import { useQuery } from '@tanstack/react-query'
import { SystemTag } from '@/components/system/tag'
import { SYSTEM_TYPE } from '@/config/constants'
import { SystemContext } from '@/context/system.context'
import { getSystemById } from '@/services/api/spacetraders'
import { type SystemDetailProps } from './system-detail.types'

export const SystemDetail = ({ systemSymbol, children }: WithChildren<SystemDetailProps>) => {
  const { isSuccess, data } = useQuery({
    queryKey: ['system', systemSymbol],
    queryFn: ({ signal }) => getSystemById({ path: { systemSymbol } }, { signal }),
  })

  if (!isSuccess) return null

  const system = data.data

  return (
    <div key={system.symbol} className="grid gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 gap-y-2">
          <SystemTag type={system.type}>{SYSTEM_TYPE.get(system.type) ?? system.type}</SystemTag>
        </div>
      </div>

      {children && <SystemContext.Provider value={{ systemSymbol: system.symbol }}>{children}</SystemContext.Provider>}
    </div>
  )
}
