import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Badge } from '@/components/badge'
import { Modal, useModalActions } from '@/components/modal'
import { CONTRACT_TYPE } from '@/config/constants'
import { createContractAccept, getContractsList } from '@/services/api/spacetraders'
import { type ContractResponse } from '@/types/spacetraders'
import { ContractItem } from '../item'
import { contractsReducer } from './contracts.utilities'

const CloseModal = () => {
  const { closeModal } = useModalActions()

  return (
    <button
      className="btn"
      onClick={() => {
        closeModal()
      }}
    >
      Cancel
    </button>
  )
}

const AvailableContract = ({ contract }: { contract: ContractResponse }) => {
  const client = useQueryClient()
  const acceptContract = useMutation({
    mutationFn: (contractID: string) => createContractAccept({ path: { contractID } }),
    onSuccess: () => {
      void client.invalidateQueries(['contracts'])
    },
  })

  return (
    <ContractItem contract={contract}>
      <Modal
        size="md"
        trigger={
          <Modal.Trigger>
            {(props) => (
              <button className="btn btn-primary btn-outline w-full" {...props}>
                View Contract
              </button>
            )}
          </Modal.Trigger>
        }
      >
        <div className="grid gap-8">
          <div>
            <div className="text-title">Accept Contract</div>
            <div className="flex gap-2">
              <div className="text-secondary text-sm">{contract.id}</div>
              <Badge>{CONTRACT_TYPE.get(contract.type) ?? contract.type}</Badge>
            </div>
          </div>
          <div className="grid gap-2"></div>
          <div className="flex justify-end gap-4">
            <CloseModal />
            <button
              className="btn btn-confirm"
              onClick={() => {
                acceptContract.mutate(contract.id)
              }}
            >
              Accept Contract
            </button>
          </div>
        </div>
      </Modal>
    </ContractItem>
  )
}

export const ContractList = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ['contracts'],
    queryFn: ({ signal }) => getContractsList(undefined, { signal }),
    select: (response) => {
      return {
        data: response.data.reduce(contractsReducer, {
          available: [],
          accepted: [],
          completed: [],
        }),
        meta: response.meta,
      }
    },
  })

  if (!isSuccess) return null

  const contracts = data.data
  const meta = data.meta

  if (meta.total === 0) {
    return (
      <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
        <div className="text-secondary text-center text-sm">
          <span className="font-bold">No contracts</span> are available
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8">
      {contracts.accepted.length > 0 && (
        <div className="grid gap-2">
          <div className="text-headline">Accepted Contracts</div>
          {contracts.accepted.map((contract) => (
            <AvailableContract key={contract.id} contract={contract} />
          ))}
        </div>
      )}
      {contracts.available.length > 0 && (
        <div className="grid gap-2">
          <div className="text-headline">Available Contracts</div>
          {contracts.available.map((contract) => (
            <AvailableContract key={contract.id} contract={contract} />
          ))}
        </div>
      )}
    </div>
  )
}
