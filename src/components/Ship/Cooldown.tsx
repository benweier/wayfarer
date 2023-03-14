import { useEffect } from 'react'
import { useShipCooldownStore } from '@/services/store/ship.cooldown'
import { ShipResponse } from '@/types/spacetraders'

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

    const timeout = setTimeout(() => {
      clearCooldown(ship.symbol)
    }, 1000 + cooldown.remainingSeconds * 1000)

    return () => clearTimeout(timeout)
  }, [clearCooldown, cooldown, ship.symbol])

  if (!cooldown) return null

  const width = (cooldown.remainingSeconds / cooldown.totalSeconds) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="h-1 w-full rounded-full bg-gray-200">
        <div className="h-full rounded-full bg-green-500" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}
