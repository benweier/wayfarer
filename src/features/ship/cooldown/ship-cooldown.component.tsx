import { type ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { useShipCooldown } from './use-ship-cooldown.hook'

export const ShipCooldown = ({ ship }: { ship: ShipResponse }) => {
  const { hasCooldown, remainingSeconds, totalSeconds } = useShipCooldown(ship)

  return (
    <div className="flex flex-col gap-1 ">
      <div className={cx('h-1 w-full rounded-full bg-zinc-300 dark:bg-zinc-500', { 'opacity-50': !hasCooldown })}>
        {remainingSeconds > 0 && (
          <div
            className="h-full rounded-full bg-green-600 dark:bg-green-400"
            style={{ width: `${(remainingSeconds / totalSeconds) * 100}%` }}
          />
        )}
      </div>
      <div className="text-secondary flex justify-between text-sm">
        <div>{remainingSeconds > 0 ? `Cooldown active` : `Cooldown inactive`}</div>
        <div>{remainingSeconds > 0 && `${remainingSeconds}s left`}</div>
      </div>
    </div>
  )
}
