import { ShipIcon } from '@/components/icons'
import { useShipResponse } from '@/context/ship.context'
import { RemoveMount } from '@/features/ship/actions'
import { ShipLoadoutItem } from './ship-loadout-item.component'
import { type ShipLoadoutListProps } from './ship-loadout.types'

export const ShipLoadoutList = ({ Item = ShipLoadoutItem }: ShipLoadoutListProps) => {
  const ship = useShipResponse()

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <div className="text-secondary text-sm uppercase">Frame</div>
            <div className="text-overline">{ship.frame.name}</div>
            <div className="w-4/5">{ship.frame.description}</div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShipIcon id="modules" className="h-5 w-5 text-lime-500" />
                <div>{ship.frame.moduleSlots}</div>
              </div>
              <div className="text-secondary text-xs uppercase">Module Slots</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShipIcon id="mounts" className="h-5 w-5 text-orange-500" />
                <div>{ship.frame.mountingPoints}</div>
              </div>
              <div className="text-secondary text-xs uppercase">Mounting Points</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="h-5 w-5 text-indigo-500" />
                <div>{ship.frame.requirements.power}</div>
              </div>
              <div className="text-secondary text-xs uppercase">Power Required</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-secondary text-sm uppercase">Reactor</div>
            <Item name={ship.reactor.name} description={ship.reactor.description}>
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="h-5 w-5 text-indigo-500" />
                <div>{ship.reactor.powerOutput}</div>
              </div>
            </Item>
          </div>

          <div className="space-y-2">
            <div className="text-secondary text-sm uppercase">Engine</div>
            <Item name={ship.engine.name} description={ship.engine.description}>
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="h-5 w-5 text-indigo-500" />
                <div>{ship.engine.requirements.power}</div>
              </div>
            </Item>
          </div>
        </div>
      </div>

      {ship.frame.moduleSlots > 0 && (
        <div className="space-y-2">
          <div className="text-secondary text-sm uppercase">
            Modules (
            {`${ship.modules.reduce((count, module) => {
              count = count + module.requirements.slots

              return count
            }, 0)}/${ship.frame.moduleSlots}`}
            )
          </div>
          <div className="grid grid-cols-3 gap-2">
            {ship.modules.map((module, index) => (
              <Item key={index} name={module.name} description={module.description}>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <ShipIcon id="modules" className="h-4 w-4 text-lime-500" />
                    <div className="text-sm">{module.requirements.slots}</div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ShipIcon id="crew" className="h-4 w-4 text-amber-500" />
                    <div className="text-sm">{module.requirements.crew}</div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ShipIcon id="power" className="h-4 w-4 text-indigo-500" />
                    <div className="text-sm">{module.requirements.power}</div>
                  </div>
                </div>
              </Item>
            ))}
          </div>
        </div>
      )}
      {ship.frame.mountingPoints > 0 && (
        <div className="space-y-2">
          <div className="text-secondary text-sm uppercase">
            Mounts ({`${ship.mounts.length}/${ship.frame.mountingPoints}`})
          </div>
          <div className="grid grid-cols-3 gap-2">
            {ship.mounts.map((mount, index) => (
              <Item
                key={index}
                name={mount.name}
                description={mount.description}
                action={
                  <RemoveMount ship={ship} mountSymbol={mount.symbol}>
                    {(props) => (
                      <button className="btn btn-outline btn-danger btn-sm" {...props}>
                        Remove
                      </button>
                    )}
                  </RemoveMount>
                }
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <ShipIcon id="crew" className="h-4 w-4 text-amber-500" />
                    <div className="text-sm">{mount.requirements.crew}</div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ShipIcon id="power" className="h-4 w-4 text-indigo-500" />
                    <div className="text-sm">{mount.requirements.power}</div>
                  </div>
                </div>
              </Item>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
