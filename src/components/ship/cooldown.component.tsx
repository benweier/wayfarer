import { useEffect } from 'react'
import { useShipCooldownStore } from '@/store/ship'
import { ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'

export const Cooldown = ({ ship }: { ship: ShipResponse }) => {
  const { cooldown, updateRemainingSeconds, clearCooldown } = useShipCooldownStore((state) => ({
    cooldown: state.cooldowns[ship.symbol],
    updateRemainingSeconds: state.updateRemainingSeconds,
    clearCooldown: state.clearCooldown,
  }))

  useEffect(() => {
    if (!cooldown) return

    const interval = setInterval(() => {
      updateRemainingSeconds(ship.symbol)
    }, 1000)

    return () => clearInterval(interval)
  }, [cooldown, ship.symbol, updateRemainingSeconds])

  useEffect(() => {
    if (!cooldown) return

    const now = Date.now()
    const expiration = new Date(cooldown.expiration)

    if (now > expiration.getTime()) {
      clearCooldown(ship.symbol)
      return
    }

    const timeout = setTimeout(() => {
      clearCooldown(ship.symbol)
    }, 1000 + cooldown.remainingSeconds * 1000)

    return () => clearTimeout(timeout)
  }, [clearCooldown, cooldown, ship.symbol])

  return (
    <div className="flex flex-col gap-1">
      <div className={cx('h-1 w-full rounded-full bg-zinc-300 dark:bg-zinc-500', { 'opacity-50': !cooldown })}>
        {cooldown && (
          <div
            className="h-full rounded-full bg-green-600 dark:bg-green-400"
            style={{ width: `${(cooldown.remainingSeconds / cooldown.totalSeconds) * 100}%` }}
          />
        )}
      </div>
      <div className="text-secondary text-sm">
        {cooldown ? `Cooldown active. ${cooldown.remainingSeconds}s left` : `Cooldown inactive`}
      </div>
    </div>
  )
}
