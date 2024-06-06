import { type InferInput, minValue, number, object, pipe, string } from 'valibot'

export const CargoTransferSchema = object({
  ship: string(),
  quantity: pipe(number(), minValue(1)),
})

export type CargoTransferSchema = InferInput<typeof CargoTransferSchema>
