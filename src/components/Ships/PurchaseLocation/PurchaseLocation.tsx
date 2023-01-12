import { PropsWithChildren, useState } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { usePurchaseShipMutation } from '@/services/spacetraders/core'
import { selectUser } from '@/store/auth'
import { useAppSelector } from '@/store/hooks'
import { cx } from '@/utilities/cx'
import { formatNumber } from '@/utilities/number'

const PurchaseShip = ({
  type,
  location,
  disabled,
  onSuccess,
}: {
  type: string
  location: string
  disabled: boolean
  onSuccess: (ship: string) => void
}) => {
  const [purchaseShip, { isLoading }] = usePurchaseShipMutation()
  const [confirm, setConfirm] = useState(false)

  return (
    <button
      className={cx('rounded py-2 px-4 text-xs leading-none transition-colors duration-75', {
        'bg-emerald-400 text-emerald-900': confirm,
      })}
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

        await purchaseShip({ location, type })
          .unwrap()
          .then((response) => {
            setConfirm(false)
            onSuccess(response.ship.id)
          })
      }}
    >
      {confirm ? 'CONFIRM' : 'PURCHASE'}
    </button>
  )
}

export const PurchaseLocation = ({
  type,
  location,
  price,
  children,
}: PropsWithChildren<{ type: string; location: string; price: number }>) => {
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  return (
    <div>
      <div className="grid grid-flow-col items-center justify-between gap-4">
        <div className="font-bold">{location}</div>
        <div className="grid grid-flow-col items-center gap-2">
          <div className="grid grid-flow-col items-center justify-end gap-1">
            <HiOutlineCash size={16} className="text-emerald-400" />
            <div className="font-semibold">{formatNumber(price)}</div>
          </div>
          <div className="w-32">
            <PurchaseShip
              type={type}
              location={location}
              disabled={(user?.credits ?? 0) < price}
              onSuccess={(id) => navigate(`/ships/${id}`)}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
