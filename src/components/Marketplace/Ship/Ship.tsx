import { FC } from 'react'
import tw from 'twin.macro'
import { Caption } from 'components/Caption'
import { YourShip } from 'types/spacetraders'

export const MarketplaceShip: FC<{ ship: YourShip }> = ({ ship, children }) => {
  const cargo = ship.cargo.reduce((cargo, { totalVolume = 0 }) => cargo + totalVolume, 0)
  const fuel = ship.cargo.find((item) => item.good === 'FUEL') ?? 0

  return (
    <div>
      <div css={tw`grid grid-flow-col gap-4`}>
        <div>
          <Caption>ID</Caption>
          {ship.id}
        </div>
        <div>
          <Caption>Type</Caption>
          {ship.type}
        </div>
        <div>
          <Caption>Capacity</Caption>
          {cargo} / {ship.maxCargo}
        </div>
        <div>
          <Caption>Fuel</Caption>
          {fuel}
        </div>
      </div>
      {children}
    </div>
  )
}
