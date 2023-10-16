import { ShipIcon } from '@/components/icons'
import { useShipResponse } from '@/context/ship.context'
import { useShipTransit } from './use-ship-transit.hook'

const formatter = new Intl.DateTimeFormat('en-gb', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  hourCycle: 'h23',
  minute: '2-digit',
  second: '2-digit',
})
const formatDate = (date: Date) => {
  const [day, , month, , year, , hour, , minute, , second] = formatter.formatToParts(date)

  return `${year.value}.${month.value}.${day.value} ${hour.value}:${minute.value}:${second.value}`
}

export const ShipTransitStatus = () => {
  const ship = useShipResponse()
  const transit = useShipTransit(ship)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-8">
        <div className="flex flex-col items-start">
          <div className="text-secondary text-xs uppercase">Departed</div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{formatDate(transit.departed)}</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-secondary text-xs uppercase">
            {transit.remainingSeconds > 0 ? 'Arriving' : 'Arrived'}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{formatDate(transit.arrival)}</div>
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
