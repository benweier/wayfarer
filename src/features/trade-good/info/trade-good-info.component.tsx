import { useTranslation } from 'react-i18next'
import { formatNumber } from '@/utilities/number.helper'
import { type TradeGoodInfoProps } from './trade-good-info.types'

export const TradeGoodInfo = ({ price, volume, supply }: TradeGoodInfoProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-12">
      <div>
        <div className="text-foreground-secondary typography-xs font-medium uppercase">Unit Price</div>
        <div className="text-base font-semibold">{formatNumber(price)}</div>
      </div>

      <div>
        <div className="text-foreground-secondary typography-xs font-medium uppercase">Units Available</div>
        <div className="text-base font-semibold">{formatNumber(volume)}</div>
      </div>

      <div>
        <div className="text-foreground-secondary typography-xs font-medium uppercase">Supply</div>
        <div className="text-base font-semibold">{t(supply, { ns: 'spacetraders.trade_supply' })}</div>
      </div>
    </div>
  )
}
