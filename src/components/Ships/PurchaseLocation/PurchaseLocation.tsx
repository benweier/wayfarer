import { FC } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import tw, { theme } from 'twin.macro'
import { Button } from 'components/Button'
import { usePurchaseShipMutation } from 'services/spacetraders/core'
import { selectUser } from 'store/auth'
import { useAppSelector } from 'store/hooks'

const PurchaseShip = ({ type, location, disabled }: { type: string; location: string; disabled: boolean }) => {
  const [purchaseShip, { isLoading }] = usePurchaseShipMutation()

  return (
    <Button
      css={tw`py-2 px-4 rounded-full text-xs leading-none`}
      disabled={isLoading || disabled}
      onClick={async () => {
        await purchaseShip({ location, type })
      }}
    >
      PURCHASE
    </Button>
  )
}

export const PurchaseLocation: FC<{ type: string; location: string; price: number }> = ({
  type,
  location,
  price,
  children,
}) => {
  const user = useAppSelector(selectUser)

  return (
    <div>
      <div css={tw`grid grid-flow-col gap-4 justify-between items-center`}>
        <div css={tw`font-bold`}>{location}</div>
        <div css={tw`grid grid-flow-col gap-2 items-center`}>
          <div css={tw`grid grid-flow-col gap-1 items-center justify-end`}>
            <HiOutlineCash size={16} color={theme`colors.emerald.400`} /> <div css={tw`font-semibold`}>{price}</div>
          </div>
          <PurchaseShip type={type} location={location} disabled={(user?.credits ?? 0) < price} />
        </div>
      </div>
      {children}
    </div>
  )
}
