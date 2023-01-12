import { PropsWithChildren } from 'react'
import { YourShip } from '@/types/spacetraders'

export const MarketplaceShip = ({ ship, children }: PropsWithChildren<{ ship: YourShip }>) => {
  const cargo = ship.cargo.reduce((cargo, { totalVolume = 0 }) => cargo + totalVolume, 0)
  const fuel = ship.cargo.find((item) => item.good === 'FUEL') ?? 0

  return (
    <div>
      <div className="grid grid-flow-col gap-4">
        <div>
          <div className="text-caption">ID</div>
          {ship.id}
        </div>
        <div>
          <div className="text-caption">Type</div>
          {ship.type}
        </div>
        <div>
          <div className="text-caption">Capacity</div>
          <>
            {cargo} / {ship.maxCargo}
          </>
        </div>
        <div>
          <div className="text-caption">Fuel</div>
          <>{fuel}</>
        </div>
      </div>
      {children}
    </div>
  )
}
