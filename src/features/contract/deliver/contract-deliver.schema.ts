import { type Input, minValue, number, object, string } from 'valibot'

export const DeliverContractSchema = object({
  ship: string(),
  item: string(),
  quantity: number([minValue(1)]),
})

export type DeliverContractSchema = Input<typeof DeliverContractSchema>
