import { Fragment } from 'react'
import { useAvailableGoodsQuery } from '@/services/spacetraders/core'
import { YourShip } from '@/types/spacetraders'

export const ShipCargo = ({ ship, children }: WithChildren<{ ship: YourShip }>) => {
  const { data } = useAvailableGoodsQuery()

  return (
    <div>
      {ship.cargo.map((cargo) => (
        <Fragment key={cargo.good}>
          <div className="grid gap-4">
            <span>{data?.goods.find((good) => good.symbol === cargo.good)?.name}</span>
            <span>{cargo.totalVolume}</span>
          </div>
        </Fragment>
      ))}

      {children}
    </div>
  )
}
