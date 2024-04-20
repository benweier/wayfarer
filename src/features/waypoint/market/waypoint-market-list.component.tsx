import { useWaypointResponse } from '@/context/waypoint.context'
import { TradeGoodBuy } from '@/features/trade-good/buy'
import { TradeGoodContext } from '@/features/trade-good/context'
import { TradeGoodSell } from '@/features/trade-good/sell'
import { getWaypointMarketQuery } from '@/services/api/spacetraders/waypoints'
import { reduceArrayToMap } from '@/utilities/reduce-array-to-map.helper'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { WaypointMarketTable } from './waypoint-market-list.table'
import { WaypointMarketLayout } from './waypoint-market.layout'

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

export const WaypointMarketList = () => {
  const { t } = useTranslation()
  const waypoint = useWaypointResponse()
  const { data } = useSuspenseQuery(
    getWaypointMarketQuery({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
  )
  const market = data.data
  const tradeGoods = reduceArrayToMap(data.data.tradeGoods, 'symbol')

  return (
    <WaypointMarketLayout
      imports={
        market.imports.length === 0 ? (
          <div className="border-border-primary flex flex-col gap-4 rounded border-2 border-dashed py-9 px-3">
            <div className="typography-lg text-center font-semibold">{t('market.imports_empty')}</div>
          </div>
        ) : (
          <TradeGoodContext.Provider value={IMPORT_MARKET_CONTEXT}>
            <WaypointMarketTable data={market.imports.map((good) => ({ good, trade: tradeGoods.get(good.symbol) }))} />
          </TradeGoodContext.Provider>
        )
      }
      exports={
        market.exports.length === 0 ? (
          <div className="border-border-primary flex flex-col gap-4 rounded border-2 border-dashed py-9 px-3">
            <div className="typography-lg text-center font-semibold">{t('market.exports_empty')}</div>
          </div>
        ) : (
          <TradeGoodContext.Provider value={EXPORT_MARKET_CONTEXT}>
            <WaypointMarketTable data={market.exports.map((good) => ({ good, trade: tradeGoods.get(good.symbol) }))} />
          </TradeGoodContext.Provider>
        )
      }
      exchange={
        market.exchange.length === 0 ? (
          <div className="border-border-primary flex flex-col gap-4 rounded border-2 border-dashed py-9 px-3">
            <div className="typography-lg text-center font-semibold">{t('market.exchange_empty')}</div>
          </div>
        ) : (
          <TradeGoodContext.Provider value={EXCHANGE_MARKET_CONTEXT}>
            <WaypointMarketTable data={market.exchange.map((good) => ({ good, trade: tradeGoods.get(good.symbol) }))} />
          </TradeGoodContext.Provider>
        )
      }
    />
  )
}
