import { useShipResponse } from '@/context/ship.context'
import { ShipLoadoutItem } from './ship-loadout-item.component'
import { type ShipLoadoutListProps } from './ship-loadout.types'

export const ShipLoadoutList = ({ Item = ShipLoadoutItem }: ShipLoadoutListProps) => {
  const ship = useShipResponse()

  return (
    <div className="grid gap-12">
      <div className="grid gap-8">
        <div>
          <div className="text-secondary text-sm uppercase">Frame</div>
          <div className="text-overline">{ship.frame.name}</div>
          <div className="">{ship.frame.description}</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <div className="text-secondary text-sm uppercase">Reactor</div>
            <Item name={ship.reactor.name} description={ship.reactor.description} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-secondary text-sm uppercase">Engine</div>
            <Item name={ship.engine.name} description={ship.engine.description} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-secondary text-sm uppercase">
            Modules ({`${ship.modules.length}/${ship.frame.moduleSlots}`})
          </div>
          <div className="grid grid-cols-3 gap-2">
            {ship.modules.map((module, index) => (
              <Item key={index} name={module.name} description={module.description} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-secondary text-sm uppercase">
            Mounts ({`${ship.mounts.length}/${ship.frame.mountingPoints}`})
          </div>
          <div className="grid grid-cols-3 gap-2">
            {ship.mounts.map((mount, index) => (
              <Item key={index} name={mount.name} description={mount.description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
