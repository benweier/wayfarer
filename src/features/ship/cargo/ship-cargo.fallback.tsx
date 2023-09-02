import { ShipCargoLayout } from './ship-cargo.layout'

export const ShipCargoFallback = () => {
  return (
    <ShipCargoLayout>
      <div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
      <div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
      <div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
    </ShipCargoLayout>
  )
}
