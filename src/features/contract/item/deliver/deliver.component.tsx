import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { createContractDeliver } from '@/services/api/spacetraders'
import { type ContractResponse } from '@/types/spacetraders'

export const DeliverContract = ({ contract }: { contract: ContractResponse }) => {
  const client = useQueryClient()
  const { ref, modal } = useModalImperativeHandle()
  const deliverContract = useMutation({
    mutationFn: ({
      contractID,
      shipSymbol,
      itemID,
      units,
    }: {
      contractID: string
      shipSymbol: string
      itemID: string
      units: number
    }) =>
      createContractDeliver({ path: { contractID }, payload: { shipSymbol: shipSymbol, tradeSymbol: itemID, units } }),
    onSuccess: () => {
      void client.invalidateQueries(['contracts'])

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
                contractID: contract.id,
                shipSymbol: values.ship,
                itemID: values.item,
                units: values.quantity,
              })
            }
          />
        </div>
      </Modal>
    </Contract>
  )
}
