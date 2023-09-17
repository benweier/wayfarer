import { ShipIcon } from '@/components/icons'
import * as ShipActions from '@/features/ship/actions'
import { type ShipResponse } from '@/types/spacetraders'

export const Inventory = ({ ship }: { ship: ShipResponse }) => {
  return (
    <div className="flex items-start gap-0.5">
      <div className="flex flex-col items-end gap-0.5">
        <div className="rounded-sm rounded-l-lg bg-zinc-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-700/25">
          <div className="text-secondary text-right text-xs uppercase">Fuel</div>
          <div className="flex items-center gap-2">
            <ShipIcon id="fuel" className="h-4 w-4 text-teal-500" />
            <div className="text-sm font-semibold">
              {ship.fuel.current} / {ship.fuel.capacity}
            </div>
          </div>
        </div>
        <ShipActions.Refuel ship={ship} disabled={ship.nav.status !== 'DOCKED'}>
          {(props) => (
            <button className="btn btn-flat btn-confirm btn-sm rounded-t-sm" {...props}>
              Refuel
            </button>
          )}
        </ShipActions.Refuel>
      </div>
      <div className="rounded-sm bg-zinc-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-700/25">
        <div className="text-secondary text-right text-xs uppercase">Cargo</div>
        <div className="flex items-center gap-2">
          <ShipIcon id="cargo" className="h-4 w-4 text-fuchsia-500" />
          <div className="text-sm font-semibold">
            {ship.cargo.units} / {ship.cargo.capacity}
          </div>
        </div>
      </div>
      <div className="rounded-sm bg-zinc-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-700/25">
        <div className="text-secondary text-right text-xs uppercase">Crew</div>
        <div className="flex items-center gap-2">
          <ShipIcon id="crew" className="h-4 w-4 text-amber-500" />
          <div className="text-sm font-semibold">
            {ship.crew.current} / {ship.crew.capacity}
          </div>
        </div>
      </div>
      <div className="rounded-sm rounded-r-lg bg-zinc-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-700/25">
        <div className="text-secondary text-right text-xs uppercase">Condition</div>
        <div className="flex items-center gap-2">
          <ShipIcon id="condition" className="h-4 w-4 text-rose-500" />
          <div className="text-sm font-semibold">{ship.frame.condition}%</div>
        </div>
      </div>
    </div>
  )
}
