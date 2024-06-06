import { type InferInput, minValue, number, object, pipe, string } from 'valibot'

export const DeliverContractSchema = object({
  ship: string(),
  item: string(),
  quantity: pipe(number(), minValue(1)),
})

export type DeliverContractSchema = InferInput<typeof DeliverContractSchema>
