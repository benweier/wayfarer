import { ShipResponse } from '@/types/spacetraders'

export const Loadout = ({ ship }: { ship: ShipResponse }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <div className="text-overline text-center">Modules</div>
        <div className="flex flex-col gap-2">
          {ship.modules.map((module) => (
            <div key={module.symbol} className="rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">
              {module.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-overline text-center">Core</div>
        <div className="flex flex-col gap-2">
          <div className="rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">{ship.frame.name}</div>
          <div className="rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">{ship.reactor.name}</div>
          <div className="rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">{ship.engine.name}</div>
        </div>
      </div>
      <div className="">
        <div className="text-overline text-center">Mounts</div>
        <div className="flex flex-col gap-2">
          {ship.mounts.map((mount) => (
            <div key={mount.symbol} className="rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">
              {mount.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
