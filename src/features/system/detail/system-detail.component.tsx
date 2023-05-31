import { useQuery } from '@tanstack/react-query'
import { SYSTEM_TYPE } from '@/config/constants'
import { SystemContext } from '@/context/system.context'
import { getSystemById } from '@/services/api/spacetraders'
import { SystemDetailProps } from './system-detail.types'

export const SystemDetail = ({ systemID, children }: WithChildren<SystemDetailProps>) => {
  const { isSuccess, data } = useQuery({
    queryKey: ['system', systemID],
    queryFn: ({ signal }) => getSystemById({ path: systemID }, { signal }),
  })

  if (!isSuccess) return null

  const system = data.data

  return (
    <div key={system.symbol}>
      <div className="flex flex-row items-center justify-start gap-4">
        <div className="text-xl font-semibold">{SYSTEM_TYPE.get(system.type) ?? system.type}</div>
        <div className="text-lg font-light">
          ({system.x}, {system.y})
        </div>
      </div>

      {children && <SystemContext.Provider value={{ systemID: system.symbol }}>{children}</SystemContext.Provider>}
    </div>
  )
}
