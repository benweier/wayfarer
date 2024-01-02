import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import * as ContractActions from '@/features/contract/actions'
import { ContractDeliverForm } from './contract-deliver.form'
import { type ContractDeliverProps } from './contract-deliver.types'

export const ContractDeliver = ({ contract }: ContractDeliverProps) => {
  const { t } = useTranslation()
  const { ref, modal } = useModalImperativeHandle()

  return (
    <Modal
      ref={ref}
      size="md"
      trigger={
        <Modal.Trigger>
          {(props) => (
            <Button intent="primary" kind="solid" size="small" {...props}>
              {t('contract.deliver', { context: 'action' })}
            </Button>
          )}
        </Modal.Trigger>
      }
    >
      <div className="space-y-8">
        <div className="text-title">{t('contract.deliver_heading')}</div>

        <ContractActions.Deliver contract={contract}>
          {({ execute }) => (
            <ContractDeliverForm
              deliver={contract.terms.deliver}
              onSubmit={async (values) => {
                await execute({
                  shipSymbol: values.ship,
                  tradeSymbol: values.item,
                  units: values.quantity,
                })

                modal.close()
              }}
            />
          )}
        </ContractActions.Deliver>
      </div>
    </Modal>
  )
}
