import { useIsMutating } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { type ContractResponse } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number'
import { type ContractItemProps } from './contract-item.types'

export const getDestinationLabels = (contract: ContractResponse) => {
  return createUniqueSet(contract.terms.deliver.map((item) => item.destinationSymbol))
}

const createUniqueSet = (items: string[]) => {
  const set = new Set(items)

  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

export const ContractItem = ({ contract, children }: PropsWithChildren<ContractItemProps>) => {
  const { t } = useTranslation()
  const isMutating = useIsMutating({ mutationKey: ['contract', contract.id], exact: false })

  return (
    <div className="relative">
      <div
        className={cx('rounded bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25', {
          'pointer-events-none opacity-30': isMutating > 0,
        })}
      >
        <div className="flex flex-1 flex-row items-center gap-8">
          <div>
            <Link to={`${ROUTES.CONTRACTS}/${contract.id}`} className="link text-lg font-bold">
              {contract.id}
            </Link>
          </div>

          <div className="flex gap-10">
            <div>
              <div className="text-secondary text-xs font-medium uppercase">Payment</div>
              <div className="flex gap-2 text-sm">
                <span>{formatNumber(contract.terms.payment.onFulfilled)}</span>
                <span className="text-secondary">({formatNumber(contract.terms.payment.onAccepted)})</span>
              </div>
            </div>
            <div>
              <div className="text-secondary text-xs font-medium uppercase">Type</div>
              <div className="text-sm">{t(contract.type, { ns: 'spacetraders.contract_type' })}</div>
            </div>
            {contract.type === 'PROCUREMENT' && (
              <div>
                <div className="text-secondary text-xs font-medium uppercase">Deliver</div>
                {contract.terms.deliver.map((delivery) => (
                  <div key={delivery.tradeSymbol} className="text-sm">
                    {t(delivery.tradeSymbol, { ns: 'spacetraders.trade_good' })} x{delivery.unitsRequired}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grow"></div>

          {children && <div className="flex justify-end">{children}</div>}
        </div>
      </div>
    </div>
  )
}
