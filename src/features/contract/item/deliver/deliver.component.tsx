import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { createContractDeliverMutation } from '@/services/api/spacetraders'
import { type ContractResponse } from '@/types/spacetraders'

export const DeliverContract = ({ contract }: { contract: ContractResponse }) => {
  const client = useQueryClient()
  const { ref, modal } = useModalImperativeHandle()
  const deliverContract = useMutation({
    mutationKey: createContractDeliverMutation.getMutationKey({ contractId: contract.id }),
    mutationFn: createContractDeliverMutation.mutationFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: [{ scope: 'contracts' }] })

      modal.close()
    },
  })

  return (
    <Contract contract={contract}>
      <Modal
        ref={ref}
        size="md"
        trigger={
          <Modal.Trigger>
            {(props) => (
              <button className="btn btn-outline btn-confirm" {...props}>
                Deliver Contract
              </button>
            )}
          </Modal.Trigger>
        }
      >
        <div className="grid gap-8">
          <div className="text-title">Deliver Contract</div>

          <DeliverContractForm
            deliver={contract.terms.deliver}
            onSubmit={(values) =>
              deliverContract.mutateAsync({
                contractId: contract.id,
                shipSymbol: values.ship,
                tradeSymbol: values.item,
                units: values.quantity,
              })
            }
          />
        </div>
      </Modal>
    </Contract>
  )
}
