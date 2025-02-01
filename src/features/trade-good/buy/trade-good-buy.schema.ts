import { maxValue, minValue, number, object, pipe, string } from 'valibot'
import type { InferInput } from 'valibot'

export const TradeGoodBuySchema = (ctx: { max: number }) =>
  object({
    ship: string(),
    item: string(),
    quantity: pipe(number(), minValue(1), maxValue(ctx.max)),
  })

export type TradeGoodBuySchema = InferInput<ReturnType<typeof TradeGoodBuySchema>>
