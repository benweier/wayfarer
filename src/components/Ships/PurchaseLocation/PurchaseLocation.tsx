import { useMutation } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { useConfirmAction } from '@/hooks/useConfirmAction'
import * as api from '@/services/api/spacetraders'
import { useAuthStore } from '@/services/store/auth'
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
  const { mutateAsync, isLoading } = useMutation(api.purchaseShipMutation)
  const { confirm, onClick, onReset } = useConfirmAction(() =>
    mutateAsync(
      { location, type },
      {
        onSuccess: (response) => {
          if (response) onSuccess(response.ship.id)
        },
      },
    ),
  )

  return (
    <button
      className={cx('btn btn-sm w-full', {
        'btn-primary': !confirm,
        'btn-confirm': confirm,
      })}
      disabled={isLoading || disabled}
      onBlur={onReset}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          onReset()
        }
      }}
      onClick={onClick}
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
  const { user } = useAuthStore()
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
