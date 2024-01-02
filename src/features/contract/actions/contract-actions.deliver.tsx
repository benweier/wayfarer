import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { type Ref, forwardRef } from 'react'
import { type ContractActionProps } from '@/features/contract/actions/contract-actions.types'
import {
  createContractDeliverMutation,
  getContractListQuery,
  getShipByIdQuery,
  getShipListQuery,
} from '@/services/api/spacetraders'

const DeliverComponent = (
  {
    contract,
    disabled = false,
    children = () => null,
  }: ContractActionProps<
    { shipSymbol: string; tradeSymbol: string; units: number },
    ReturnType<typeof createContractDeliverMutation.mutationFn>
  >,
  ref: Ref<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createContractDeliverMutation.getMutationKey({ contractId: contract.id }),
    mutationFn: createContractDeliverMutation.mutationFn,
    onSuccess: (response, { contractId, shipSymbol }) => {
      const contracts = client.getQueryData(getContractListQuery().queryKey)
      const contractIndex = contracts?.data.findIndex((contract) => contract.id === contractId) ?? -1

      if (contracts && contractIndex > -1) {
        client.setQueryData(
          getContractListQuery().queryKey,
          produce(contracts, (draft) => {
            draft.data[contractIndex] = response.data.contract
          }),
        )
      }

      const ship = client.getQueryData(getShipByIdQuery({ shipSymbol }).queryKey)
      const ships = client.getQueryData(getShipListQuery().queryKey)
      const shipIndex = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery({ shipSymbol }).queryKey,
          produce(ship, (draft) => {
            draft.data.cargo = response.data.cargo
          }),
        )
      }

      if (ships && shipIndex > -1) {
        client.setQueryData(
          getShipListQuery().queryKey,
          produce(ships, (draft) => {
            draft.data[shipIndex].cargo = response.data.cargo
          }),
        )
      }
    },
  })

  return children({
    ref,
    disabled: disabled || isPending,
    execute: (args) => {
      return mutateAsync({ contractId: contract.id, ...args })
    },
  })
}

export const Deliver = forwardRef(DeliverComponent)
