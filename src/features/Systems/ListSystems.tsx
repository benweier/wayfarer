import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getSystemsList } from '@/services/api/spacetraders'

export const ListSystems = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ['systems'],
    queryFn: ({ signal }) => getSystemsList(undefined, { signal }),
  })

  if (!isSuccess) return null

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.data.map((system) => {
          return (
            <div key={system.symbol} className="bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25">
              <Link to={`${ROUTES.SYSTEMS}/${system.symbol}`}>{system.symbol}</Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
