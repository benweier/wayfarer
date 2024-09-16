import { formatNumber } from '@/utilities/number.helper'
import { useTranslation } from 'react-i18next'
import type { TradeGoodInfoProps } from './trade-good-info.types'

export const TradeGoodInfo = ({ price, volume, supply }: TradeGoodInfoProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-12">
      <div>
        <div className="typography-xs font-medium text-foreground-secondary uppercase">Unit Price</div>
        <div className="typography-base font-semibold">{formatNumber(price)}</div>
      </div>

      <div>
        <div className="typography-xs font-medium text-foreground-secondary uppercase">Units Available</div>
        <div className="typography-base font-semibold">{formatNumber(volume)}</div>
      </div>

      <div>
        <div className="typography-xs font-medium text-foreground-secondary uppercase">Supply</div>
        <div className="typography-base font-semibold">{t(supply, { ns: 'spacetraders.trade_supply' })}</div>
      </div>
    </div>
  )
}
