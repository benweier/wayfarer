import { ShipIcon } from '@/components/icons'
import { useShipContext } from '@/context/ship.context'
import { useShipTransit } from './use-ship-transit.hook'

export const ShipTransitStatus = () => {
  const ship = useShipContext()
  const transit = useShipTransit(ship)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-8">
        <div className="flex flex-col items-start">
          <div className="text-secondary text-xs uppercase">Departed</div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">
              {transit.departed.toLocaleDateString()} {transit.departed.toLocaleTimeString()}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-secondary text-xs uppercase">
            {transit.remainingSeconds > 0 ? 'Arriving' : 'Arrived'}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">
              {transit.arrival.toLocaleDateString()} {transit.arrival.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="h-1 grow rounded-full bg-zinc-200 dark:bg-zinc-600">
          <div className="h-full rounded-full bg-green-500" style={{ width: `${transit.progress}%` }} />
        </div>
        <div className="text-secondary flex w-12 justify-end text-right text-sm">
          {transit.remainingSeconds === 0 ? (
            <ShipIcon id="pin" className="h-5 w-5 text-green-500" />
          ) : (
            `${transit.remainingSeconds} s`
          )}
        </div>
      </div>
    </div>
  )
}
