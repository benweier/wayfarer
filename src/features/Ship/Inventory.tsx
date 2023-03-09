import { BoltIcon, CubeIcon, UserGroupIcon } from '@heroicons/react/20/solid'
import { ShipActions } from '@/components/Ship'
import { ShipResponse } from '@/types/spacetraders'

export const Inventory = ({ ship }: { ship: ShipResponse }) => {
  return (
    <div className="flex gap-8">
      <div>
        <div className="text-right text-xs font-medium uppercase opacity-60">Fuel</div>
        <div className="flex items-center gap-2">
          {ship.fuel.consumed.amount > 0 && <ShipActions.Refuel shipID={ship.symbol} />}
          <BoltIcon className="h-5 w-5 text-teal-500" />
          <div className="text-sm font-medium">
            {ship.fuel.current} / {ship.fuel.capacity}
          </div>
        </div>
      </div>
      <div>
        <div className="text-right text-xs font-medium uppercase opacity-60">Cargo</div>
        <div className="flex items-center gap-2">
          <CubeIcon className="h-5 w-5 text-fuchsia-500" />
          <div className="text-sm font-medium">
            {ship.cargo.units} / {ship.cargo.capacity}
          </div>
        </div>
      </div>
      <div>
        <div className="text-right text-xs font-medium uppercase opacity-60">Crew</div>
        <div className="flex items-center gap-2">
          <UserGroupIcon className="h-5 w-5 text-amber-500" />
          <div className="text-sm font-medium">
            {ship.crew.current} / {ship.crew.capacity}
          </div>
        </div>
      </div>
    </div>
  )
}
