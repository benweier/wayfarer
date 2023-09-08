import { useNavigate } from 'react-router-dom'
import { useShipResponse } from '@/context/ship.context'
import { ShipLoadoutItem } from './ship-loadout-item.component'
import { type ShipLoadoutListProps } from './ship-loadout.types'

export const ShipLoadoutList = ({ Item = ShipLoadoutItem }: ShipLoadoutListProps) => {
  const navigate = useNavigate()
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

          <ul className="text-secondary text-sm">
            <li>Module Slots {ship.frame.moduleSlots}</li>
            <li>Mounting Points {ship.frame.mountingPoints}</li>
            <li>Power Required {ship.frame.requirements.power}</li>
          </ul>

          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/fleet/ship/${ship.symbol}/loadout`)
            }}
          >
            Manage Loadout
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-secondary text-sm uppercase">Reactor</div>
            <Item name={ship.reactor.name} description={ship.reactor.description} />
          </div>

          <div className="space-y-2">
            <div className="text-secondary text-sm uppercase">Engine</div>
            <Item name={ship.engine.name} description={ship.engine.description} />
          </div>
        </div>
      </div>

      {ship.frame.moduleSlots > 0 && (
        <div className="space-y-2">
          <div className="text-secondary text-sm uppercase">
            Modules ({`${ship.modules.length}/${ship.frame.moduleSlots}`})
          </div>
          <div className="grid grid-cols-3 gap-2">
            {ship.modules.map((module, index) => (
              <Item key={index} name={module.name} description={module.description} />
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
              <Item key={index} name={mount.name} description={mount.description} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
