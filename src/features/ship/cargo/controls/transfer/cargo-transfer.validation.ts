import { type Input, minValue, number, object, string } from 'valibot'

export const CargoTransferSchema = object({
  ship: string(),
  quantity: number([minValue(1)]),
})

export type CargoTransferSchema = Input<typeof CargoTransferSchema>
