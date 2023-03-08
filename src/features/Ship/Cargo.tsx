import { ShipResponse } from '@/types/spacetraders'

export const Cargo = ({ ship }: { ship: ShipResponse }) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {ship.cargo.inventory.map((item) => {
        return (
          <div key={item.symbol} className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">{item.name}</span>
              <span>{item.units}</span>
            </div>
            <div className="text-sm opacity-60">{item.description}</div>
          </div>
        )
      })}
    </div>
  )
}
