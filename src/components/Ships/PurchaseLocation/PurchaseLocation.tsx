import { FC, useState } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import tw, { theme } from 'twin.macro'
import { Button } from '@/components/Button'
import { usePurchaseShipMutation } from '@/services/spacetraders/core'
import { selectUser } from '@/store/auth'
import { useAppSelector } from '@/store/hooks'
import { formatNumber } from '@/utilities/number'

const PurchaseShip = ({ type, location, disabled }: { type: string; location: string; disabled: boolean }) => {
  const [purchaseShip, { isLoading }] = usePurchaseShipMutation()
  const [confirm, setConfirm] = useState(false)

  return (
    <Button
      css={[
        tw`py-2 px-4 rounded text-xs leading-none transition-colors duration-75`,
        confirm && tw`bg-emerald-400 text-emerald-900`,
      ]}
      disabled={isLoading || disabled}
      onBlur={() => setConfirm(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setConfirm(false)
        }
      }}
      onClick={async () => {
        if (!confirm) {
          setConfirm(true)
          return
        }

        await purchaseShip({ location, type }).then(() => {
          setConfirm(false)
        })
      }}
    >
      {confirm ? 'CONFIRM' : 'PURCHASE'}
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
            <HiOutlineCash size={16} color={theme`colors.emerald.400`} />{' '}
            <div css={tw`font-semibold`}>{formatNumber(price)}</div>
          </div>
          <div css={tw`w-32`}>
            <PurchaseShip type={type} location={location} disabled={(user?.credits ?? 0) < price} />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
