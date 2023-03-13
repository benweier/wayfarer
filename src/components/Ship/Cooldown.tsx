import { useEffect } from 'react'
import { useShipCooldownStore } from '@/services/store/ship.cooldown'

export const Cooldown = ({ shipID }: { shipID: string }) => {
  const { cooldown, updateRemainingSeconds, clearCooldown } = useShipCooldownStore((state) => ({
    cooldown: state.ships[shipID]?.cooldown,
    updateRemainingSeconds: state.updateRemainingSeconds,
    clearCooldown: state.clearCooldown,
  }))

  useEffect(() => {
    if (!cooldown) return

    const interval = setInterval(() => {
      updateRemainingSeconds(shipID)
    }, 1000)

    return () => clearInterval(interval)
  }, [cooldown, shipID, updateRemainingSeconds])

  useEffect(() => {
    if (!cooldown) return

    const timeout = setTimeout(() => {
      clearCooldown(shipID)
    }, 1000 + cooldown.remainingSeconds * 1000)

    return () => clearTimeout(timeout)
  }, [clearCooldown, cooldown, shipID])

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