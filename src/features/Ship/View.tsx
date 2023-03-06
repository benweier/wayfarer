import { BoltIcon, CubeIcon, UserGroupIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import { getShipById } from '@/services/api/spacetraders'

export const View = ({ symbol }: { symbol: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['ship', symbol],
    queryFn: ({ signal }) => getShipById({ path: symbol }, { signal }),
  })

  if (!isSuccess) return null

  const ship = data.data

  return (
    <div className="grid gap-8">
      <div className="headline">
        <span className="font-bold">Registration:</span> {ship.registration.name} • {ship.registration.role} •{' '}
        {ship.registration.factionSymbol}
      </div>

      <div className="grid grid-cols-3 gap-0.5 rounded border-2 border-zinc-500/50 bg-zinc-500/50">
        <div className="flex flex-col items-center gap-2 rounded bg-zinc-800 p-3">
          <div className="text-xs font-bold opacity-70">FUEL</div>
          <BoltIcon className="h-7 w-7 text-teal-500" />
          <div className="font-semibold">
            {ship.fuel.current} / {ship.fuel.capacity}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 rounded bg-zinc-800 p-3">
          <div className="text-xs font-bold opacity-70">CARGO</div>
          <CubeIcon className="h-7 w-7 text-fuchsia-500" />
          <div className="font-semibold">
            {ship.cargo.units} / {ship.cargo.capacity}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 rounded bg-zinc-800 p-3">
          <div className="text-xs font-bold opacity-70">CREW</div>
          <UserGroupIcon className="h-7 w-7 text-amber-500" />
          <div className="font-semibold">
            {ship.crew.current} / {ship.crew.capacity}
          </div>
        </div>
      </div>
    </div>
  )
}
