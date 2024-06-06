import { type InferInput, maxValue, minValue, number, object, pipe, string } from 'valibot'

export const TradeGoodSellSchema = (ctx: { max: number }) =>
  object({
    ship: string(),
    item: string(),
    quantity: pipe(number(), minValue(1), maxValue(ctx.max)),
  })

export type TradeGoodSellSchema = InferInput<ReturnType<typeof TradeGoodSellSchema>>
