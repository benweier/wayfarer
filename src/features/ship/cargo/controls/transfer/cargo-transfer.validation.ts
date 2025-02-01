import { minValue, number, object, pipe, string } from 'valibot'
import type { InferInput } from 'valibot'

export const CargoTransferSchema = object({
  ship: string(),
  quantity: pipe(number(), minValue(1)),
})

export type CargoTransferSchema = InferInput<typeof CargoTransferSchema>
