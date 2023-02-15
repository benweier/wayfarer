import { BoltIcon, CubeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getShipsList } from '@/services/api/spacetraders'

export const MyShips = () => {
  const { isSuccess, data } = useQuery({ queryKey: ['ships'], queryFn: getShipsList })

  if (!isSuccess) return null

  return (
    <div className="grid">
      {data.map((ship) => {
        return (
          <div key={ship.symbol} className="bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25">
            <div className="flex flex-row items-center justify-start gap-4">
              <div className="rounded bg-black py-1 px-2 text-xs font-bold">{ship.nav.status}</div>
              <div className="rounded bg-black py-1 px-2 text-xs font-bold">{ship.nav.flightMode}</div>
              <div className="flex flex-1 flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium uppercase">{ship.symbol}</div>
                  <div className="truncate text-lg font-semibold">{ship.registration.name}</div>
                </div>
                <div className="flex gap-2">
                  <BoltIcon className="h-6 w-6" />
                  <div>
                    {ship.fuel.current} / {ship.fuel.capacity}
                  </div>
                </div>
                <div className="flex gap-2">
                  <CubeIcon className="h-6 w-6" />
                  <div>
                    {ship.cargo.units} / {ship.cargo.capacity}
                  </div>
                </div>
                <div className="flex gap-2">
                  <UserGroupIcon className="h-6 w-6" />
                  <div>
                    {ship.crew.current} / {ship.crew.capacity}
                  </div>
                </div>
              </div>
              <div>
                <Link to={`/fleet/ship/${ship.symbol}`} className="btn">
                  MANAGE
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
