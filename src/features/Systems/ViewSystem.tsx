import { useQuery } from '@tanstack/react-query'
import { getSystemById } from '@/services/api/spacetraders'

export const ViewSystem = ({ id }: { id: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['system', id],
    queryFn: ({ signal }) => getSystemById({ path: id }, { signal }),
  })

  if (!isSuccess) return null

  const system = data.data

  return (
    <div className="grid">
      <div key={system.symbol} className="bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25">
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="flex flex-1 flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium uppercase">{system.symbol}</div>
              <div className="truncate text-lg font-semibold">{system.type}</div>
            </div>
            <div>
              <div className="truncate text-lg font-semibold">
                {system.x}, {system.y}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
