import { TradeGoodBuy } from '@/features/trade-good/buy'
import { TradeGoodContext } from '@/features/trade-good/context'
import { TradeGoodSell } from '@/features/trade-good/sell'
import { WaypointMarketTable } from '@/features/waypoint/market/waypoint-market-list.table'
import type { WaypointMarketGroupProps } from '@/features/waypoint/market/waypoint-market.types'
import { useTranslation } from 'react-i18next'

const IMPORT_MARKET_CONTEXT = {
  Buy: TradeGoodBuy,
}
const EXPORT_MARKET_CONTEXT = {
  Sell: TradeGoodSell,
}
const EXCHANGE_MARKET_CONTEXT = {
  Buy: TradeGoodBuy,
  Sell: TradeGoodSell,
}

export const WaypointMarketImports = ({ data, trade }: WaypointMarketGroupProps) => {
  const { t } = useTranslation()

  if (data.length === 0) {
    return (
      <div className="flex flex-col gap-4 rounded border-2 border-border-primary border-dashed px-3 py-9">
        <div className="typography-lg text-center font-semibold">{t('market.imports_empty')}</div>
      </div>
    )
  }

  return (
    <TradeGoodContext value={IMPORT_MARKET_CONTEXT}>
      <WaypointMarketTable data={data.map((good) => ({ good, trade: trade.get(good.symbol) }))} />
    </TradeGoodContext>
  )
}

export const WaypointMarketExports = ({ data, trade }: WaypointMarketGroupProps) => {
  const { t } = useTranslation()

  if (data.length === 0) {
    return (
      <div className="flex flex-col gap-4 rounded border-2 border-border-primary border-dashed px-3 py-9">
        <div className="typography-lg text-center font-semibold">{t('market.exports_empty')}</div>
      </div>
    )
  }

  return (
    <TradeGoodContext value={EXPORT_MARKET_CONTEXT}>
      <WaypointMarketTable data={data.map((good) => ({ good, trade: trade.get(good.symbol) }))} />
    </TradeGoodContext>
  )
}

export const WaypointMarketExchange = ({ data, trade }: WaypointMarketGroupProps) => {
  const { t } = useTranslation()

  if (data.length === 0) {
    return (
      <div className="flex flex-col gap-4 rounded border-2 border-border-primary border-dashed px-3 py-9">
        <div className="typography-lg text-center font-semibold">{t('market.exchange_empty')}</div>
      </div>
    )
  }

  return (
    <TradeGoodContext value={EXCHANGE_MARKET_CONTEXT}>
      <WaypointMarketTable data={data.map((good) => ({ good, trade: trade.get(good.symbol) }))} />
    </TradeGoodContext>
  )
}
