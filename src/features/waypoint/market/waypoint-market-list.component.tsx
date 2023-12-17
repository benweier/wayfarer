import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useWaypointResponse } from '@/context/waypoint.context'
import { TradeGoodBuy } from '@/features/trade-good/buy'
import { TradeGoodContext } from '@/features/trade-good/context'
import { TradeGoodSell } from '@/features/trade-good/sell'
import { getWaypointMarketQuery } from '@/services/api/spacetraders'
import { reduceArrayToMap } from '@/utilities/reduce-array-to-map.helper'
import { WaypointMarketTable } from './waypoint-market-list.table'
import { WaypointMarketLayout } from './waypoint-market.layout'

export const WaypointMarketList = () => {
  const { t } = useTranslation()
  const waypoint = useWaypointResponse()
  const { data } = useSuspenseQuery({
    queryKey: getWaypointMarketQuery.getQueryKey({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
    queryFn: getWaypointMarketQuery.queryFn,
  })
  const market = data.data
  const tradeGoods = reduceArrayToMap(data.data.tradeGoods, 'symbol')

  return (
    <WaypointMarketLayout
      imports={
        market.imports.length === 0 ? (
          <div className="flex flex-col gap-4 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
            <div className="text-overline text-center">{t('market.imports_empty')}</div>
          </div>
        ) : (
          <TradeGoodContext.Provider value={{ Sell: TradeGoodSell }}>
            <WaypointMarketTable data={market.imports.map((good) => ({ good, trade: tradeGoods.get(good.symbol) }))} />
          </TradeGoodContext.Provider>
        )
      }
      exports={
        market.exports.length === 0 ? (
          <div className="flex flex-col gap-4 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
            <div className="text-overline text-center">{t('market.exports_empty')}</div>
          </div>
        ) : (
          <TradeGoodContext.Provider value={{ Buy: TradeGoodBuy }}>
            <WaypointMarketTable data={market.exports.map((good) => ({ good, trade: tradeGoods.get(good.symbol) }))} />
          </TradeGoodContext.Provider>
        )
      }
      exchange={
        market.exchange.length === 0 ? (
          <div className="flex flex-col gap-4 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
            <div className="text-overline text-center">{t('market.exchange_empty')}</div>
          </div>
        ) : (
          <TradeGoodContext.Provider value={{ Buy: TradeGoodBuy, Sell: TradeGoodSell }}>
            <WaypointMarketTable data={market.exchange.map((good) => ({ good, trade: tradeGoods.get(good.symbol) }))} />
          </TradeGoodContext.Provider>
        )
      }
    />
  )
}
