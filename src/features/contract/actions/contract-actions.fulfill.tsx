import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { type Ref, forwardRef } from 'react'
import { type ContractActionProps } from '@/features/contract/actions/contract-actions.types'
import { createContractFulfillMutation, getContractListQuery } from '@/services/api/spacetraders'
import { useAuthStore } from '@/store/auth'

const FulfillComponent = (
  {
    contract,
    disabled = false,
    children,
  }: ContractActionProps<never, ReturnType<typeof createContractFulfillMutation.mutationFn>>,
  ref: Ref<HTMLButtonElement>,
) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createContractFulfillMutation.getMutationKey({ contractId: contract.id }),
    mutationFn: createContractFulfillMutation.mutationFn,
    onSuccess: (response, { contractId }) => {
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

      setAgent(response.data.agent)
    },
  })

  return children({
    ref,
    disabled: disabled || isPending,
    execute: () => {
      return mutateAsync({ contractId: contract.id })
    },
  })
}

export const Fulfill = forwardRef(FulfillComponent)
