import { Fragment } from 'react'
import tw from 'twin.macro'
import { usePurchaseGoodsMutation } from '@/services/spacetraders/core'
import { Marketplace, YourShip } from '@/types/spacetraders'

export const PurchaseGoods = ({ ship, marketplace }: { ship: YourShip; marketplace: Marketplace[] }) => {
  const [purchaseGoodsMutation] = usePurchaseGoodsMutation()

  console.log(purchaseGoodsMutation)
  console.log(ship, marketplace)
  return (
    <div css={tw`grid grid-flow-col gap-4`}>
      <div>
        {marketplace.map((item) => (
          <Fragment key={item.symbol}>{item.symbol}</Fragment>
        ))}
      </div>
    </div>
  )
}
