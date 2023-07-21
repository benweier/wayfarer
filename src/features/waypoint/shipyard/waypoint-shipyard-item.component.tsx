import { type MarketGood } from '@/types/spacetraders'

export const WaypointShipyardItem = ({
  item,
  available,
  children,
}: WithChildren<{ item: MarketGood; available?: number }>) => {
  return (
    <div key={item.symbol} className="grid gap-4 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">{item.name}</span>
          {available !== undefined && (
            <span className="text-lg font-bold">{new Intl.NumberFormat('en-US').format(available)}</span>
          )}
        </div>
        <div className="text-secondary text-sm">{item.description}</div>
      </div>

      {children}
    </div>
  )
}
