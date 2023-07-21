import { type InferType, number, object, string } from 'yup'

export const validation = object({
  ship: string().required(),
  item: string().required(),
  quantity: number().min(1).required(),
})

export type SellCargoSchema = InferType<typeof validation>
