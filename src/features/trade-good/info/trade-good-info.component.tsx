import { MARKET_TRADE_GOOD_SUPPLY } from '@/config/constants'
import { formatNumber } from '@/utilities/number'
import { type TradeGoodInfoProps } from './trade-good-info.types'

export const TradeGoodInfo = ({ price, volume, supply }: TradeGoodInfoProps) => {
  return (
    <div className="flex items-center gap-12">
      <div>
        <div className="text-secondary text-xs font-medium uppercase">Unit Price</div>
        <div className="text-base font-semibold">{formatNumber(price)}</div>
      </div>

      <div>
        <div className="text-secondary text-xs font-medium uppercase">Units Available</div>
        <div className="text-base font-semibold">{formatNumber(volume)}</div>
      </div>

      <div>
        <div className="text-secondary text-xs font-medium uppercase">Supply</div>
        <div className="text-base font-semibold">{MARKET_TRADE_GOOD_SUPPLY.get(supply)}</div>
      </div>
    </div>
  )
}
