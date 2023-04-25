import { BoltIcon, CubeIcon, UserGroupIcon } from '@heroicons/react/20/solid'
import { ShipResponse } from '@/types/spacetraders'
import * as Actions from './actions.component'

export const Inventory = ({ ship }: { ship: ShipResponse }) => {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-end">
        <div className="text-secondary text-right text-xs uppercase">Fuel</div>
        <div className="flex items-center gap-2">
          <BoltIcon className="h-5 w-5 text-teal-500" />
          <div className="text-sm font-semibold leading-snug">
            {ship.fuel.current} / {ship.fuel.capacity}
          </div>
        </div>
        <Actions.Refuel ship={ship} trigger={<button className="btn btn-confirm btn-flat btn-sm">Refuel</button>} />
      </div>
      <div>
        <div className="text-secondary text-right text-xs uppercase">Cargo</div>
        <div className="flex items-center gap-2">
          <CubeIcon className="h-5 w-5 text-fuchsia-500" />
          <div className="text-sm font-semibold leading-snug">
            {ship.cargo.units} / {ship.cargo.capacity}
          </div>
        </div>
      </div>
      <div>
        <div className="text-secondary text-right text-xs uppercase">Crew</div>
        <div className="flex items-center gap-2">
          <UserGroupIcon className="h-5 w-5 text-amber-500" />
          <div className="text-sm font-semibold leading-snug">
            {ship.crew.current} / {ship.crew.capacity}
          </div>
        </div>
      </div>
    </div>
  )
}
