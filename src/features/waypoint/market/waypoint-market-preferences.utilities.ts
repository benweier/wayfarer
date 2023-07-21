import { type MarketGood, type MarketTradeGood } from '@/types/spacetraders'

export const sortByTradeAttribute = (
  attr: 'purchasePrice' | 'sellPrice' | 'tradeVolume',
  tradeGoods?: Map<string, MarketTradeGood>,
): ((a: MarketGood, b: MarketGood) => number) => {
  return (a, b) => {
    const goodA = tradeGoods?.get(a.symbol)
    const goodB = tradeGoods?.get(b.symbol)

    if (!goodA || !goodB) return a.name.localeCompare(b.name)

    if (goodA[attr] === goodB[attr]) return a.name.localeCompare(b.name)

    return goodA[attr] - goodB[attr]
  }
}

export const makeSortByTradeAttributeFn = (
  param?: string | null,
  tradeGoods?: Map<string, MarketTradeGood>,
): ((a: MarketGood, b: MarketGood) => number) => {
  switch (param) {
    case 'buy':
      return sortByTradeAttribute('purchasePrice', tradeGoods)

    case 'sell':
      return sortByTradeAttribute('sellPrice', tradeGoods)

    case 'volume':
      return sortByTradeAttribute('tradeVolume', tradeGoods)

    case 'name':
    default:
      return (a, b) => a.name.localeCompare(b.name)
  }
}
