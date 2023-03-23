import { InferType, number, object, ref, string } from 'yup'

export const validation = object({
  ship: string().required(),
  item: string().required(),
  quantity: number().min(1).max(ref('$good.tradeVolume')).required(),
})

export type PurchaseCargoSchema = InferType<typeof validation>
