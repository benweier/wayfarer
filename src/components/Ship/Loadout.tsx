import { ShipResponse } from '@/types/spacetraders'

export const Loadout = ({ ship }: { ship: ShipResponse }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="flex flex-col gap-4">
        <div className="text-overline text-center">Modules</div>
        <div className="flex flex-col gap-2">
          {ship.modules.map((module, index) => (
            <div key={index} className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">
              <span className="font-semibold">{module.name}</span>
              <span className="text-secondary text-sm">{module.description}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-overline text-center">Core</div>
        <div className="flex flex-col gap-2">
          <div className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">
            <span className="font-semibold">{ship.frame.name}</span>
            <span className="text-secondary text-sm">{ship.frame.description}</span>
          </div>
          <div className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">
            <span className="font-semibold">{ship.reactor.name}</span>
            <span className="text-secondary text-sm">{ship.reactor.description}</span>
          </div>
          <div className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">
            <span className="font-semibold">{ship.engine.name}</span>
            <span className="text-secondary text-sm">{ship.engine.description}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-overline text-center">Mounts</div>
        <div className="flex flex-col gap-2">
          {ship.mounts.map((mount, index) => (
            <div key={index} className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">
              <span className="font-semibold">{mount.name}</span>
              <span className="text-secondary text-sm">{mount.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
