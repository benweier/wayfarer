import { FC } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import tw, { theme } from 'twin.macro'
import { Button } from 'components/Button'
import { usePurchaseShipMutation } from 'services/spacetraders/core'
import { selectUser } from 'store/auth'
import { useAppSelector } from 'store/hooks'

const PurchaseShip = ({ type, location, price }: { type: string; location: string; price: number }) => {
  const [purchaseShip, { isLoading }] = usePurchaseShipMutation()
  const user = useAppSelector(selectUser)

  return (
    <Button
      css={tw`py-2 rounded-full`}
      disabled={isLoading || (user?.credits ?? 0) < price}
      onClick={async () => {
        await purchaseShip({ location, type })
      }}
    >
      Purchase
    </Button>
  )
}

export const PurchaseLocation: FC<{ type: string; location: string; price: number }> = ({
  type,
  location,
  price,
  children,
}) => {
  return (
    <div>
      <div css={tw`grid grid-flow-col gap-4 justify-between items-center`}>
        <div>{location}</div>
        <div css={tw`grid grid-flow-col gap-1 items-center`}>
          <HiOutlineCash size={16} color={theme`colors.emerald.400`} /> {price}{' '}
          <PurchaseShip type={type} location={location} price={price} />
        </div>
      </div>
      {children}
    </div>
  )
}
