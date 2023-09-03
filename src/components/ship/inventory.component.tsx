import { ShipIcon } from '@/components/icons'
import * as ShipActions from '@/features/ship/actions'
import { type ShipResponse } from '@/types/spacetraders'

export const Inventory = ({ ship }: { ship: ShipResponse }) => {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-end">
        <div className="text-secondary text-right text-xs uppercase">Fuel</div>
        <div className="flex items-center gap-2">
          <ShipIcon id="fuel" className="h-5 w-5 text-teal-500" />
          <div className="text-sm font-semibold leading-snug">
            {ship.fuel.current} / {ship.fuel.capacity}
          </div>
        </div>
        <ShipActions.Refuel ship={ship} disabled={ship.nav.status !== 'DOCKED'}>
          {(props) => (
            <button className="btn btn-flat btn-confirm btn-sm" {...props}>
              Refuel
            </button>
          )}
        </ShipActions.Refuel>
      </div>
      <div>
        <div className="text-secondary text-right text-xs uppercase">Cargo</div>
        <div className="flex items-center gap-2">
          <ShipIcon id="cargo" className="h-5 w-5 text-fuchsia-500" />
          <div className="text-sm font-semibold leading-snug">
            {ship.cargo.units} / {ship.cargo.capacity}
          </div>
        </div>
      </div>
      <div>
        <div className="text-secondary text-right text-xs uppercase">Crew</div>
        <div className="flex items-center gap-2">
          <ShipIcon id="crew" className="h-5 w-5 text-amber-500" />
          <div className="text-sm font-semibold leading-snug">
            {ship.crew.current} / {ship.crew.capacity}
          </div>
        </div>
      </div>
      <div>
        <div className="text-secondary text-right text-xs uppercase">Condition</div>
        <div className="flex items-center gap-2">
          <ShipIcon id="condition" className="h-5 w-5 text-rose-500" />
          <div className="text-sm font-semibold leading-snug">{ship.frame.condition}%</div>
        </div>
      </div>
    </div>
  )
}
