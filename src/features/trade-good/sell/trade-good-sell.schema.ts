import { type Input, maxValue, minValue, number, object, string } from 'valibot'

export const TradeGoodSellSchema = (ctx: { max: number }) =>
  object({
    ship: string(),
    item: string(),
    quantity: number([minValue(1), maxValue(ctx.max)]),
  })

export type TradeGoodSellSchema = Input<ReturnType<typeof TradeGoodSellSchema>>
