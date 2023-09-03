import { useShipResponse } from '@/context/ship.context'
import { ShipLoadoutItem } from './ship-loadout-item.component'
import { type ShipLoadoutListProps } from './ship-loadout.types'

export const ShipLoadoutList = ({ Item = ShipLoadoutItem }: ShipLoadoutListProps) => {
  const ship = useShipResponse()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="flex flex-col gap-4">
        <div className="text-overline text-center">Modules ({`${ship.modules.length}/${ship.frame.moduleSlots}`})</div>
        <div className="flex flex-col gap-2">
          {ship.modules.map((module, index) => (
            <Item key={index} name={module.name} description={module.description} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-overline text-center">Frame</div>
        <Item name={ship.frame.name} description={ship.frame.description} />

        <div className="text-overline text-center">Reactor</div>
        <Item name={ship.reactor.name} description={ship.reactor.description} />

        <div className="text-overline text-center">Engine</div>
        <Item name={ship.engine.name} description={ship.engine.description} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-overline text-center">Mounts ({`${ship.mounts.length}/${ship.frame.mountingPoints}`})</div>
        <div className="flex flex-col gap-2">
          {ship.mounts.map((mount, index) => (
            <Item key={index} name={mount.name} description={mount.description} />
          ))}
        </div>
      </div>
    </div>
  )
}
