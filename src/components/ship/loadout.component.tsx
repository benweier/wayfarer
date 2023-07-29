import { useShipStore } from '@/context/ship.context'

const LoadoutItem = ({ name, description }: { name: string; description: string }) => {
  return (
    <div className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10">
      <span className="font-semibold">{name}</span>
      <span className="text-secondary text-sm">{description}</span>
    </div>
  )
}

export const Loadout = () => {
  const ship = useShipStore()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="flex flex-col gap-4">
        <div className="text-overline text-center">Modules</div>
        <div className="flex flex-col gap-2">
          {ship.modules.map((module, index) => (
            <LoadoutItem key={index} name={module.name} description={module.description} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-overline text-center">Frame</div>
        <LoadoutItem name={ship.frame.name} description={ship.frame.description} />

        <div className="text-overline text-center">Reactor</div>
        <LoadoutItem name={ship.reactor.name} description={ship.reactor.description} />

        <div className="text-overline text-center">Engine</div>
        <LoadoutItem name={ship.engine.name} description={ship.engine.description} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-overline text-center">Mounts</div>
        <div className="flex flex-col gap-2">
          {ship.mounts.map((mount, index) => (
            <LoadoutItem key={index} name={mount.name} description={mount.description} />
          ))}
        </div>
      </div>
    </div>
  )
}
