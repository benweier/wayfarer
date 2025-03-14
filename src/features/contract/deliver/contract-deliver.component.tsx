import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import * as ContractActions from '@/features/contract/actions'
import { ContractDeliverForm } from './contract-deliver.form'
import type { ContractDeliverProps } from './contract-deliver.types'

export const ContractDeliver = ({ contract }: ContractDeliverProps) => {
  const { t } = useTranslation()
  const { ref, modal } = useModalImperativeHandle()

  return (
    <Modal
      ref={ref}
      size="md"
      trigger={
        <Modal.Trigger>
          <Button intent="info" kind="solid" size="small">
            {t('contract.deliver', { context: 'action' })}
          </Button>
        </Modal.Trigger>
      }
    >
      <Modal.Content
        header={
          <Modal.Header>
            <Modal.Title>{t('contract.deliver_heading')}</Modal.Title>
          </Modal.Header>
        }
      >
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
      </Modal.Content>
    </Modal>
  )
}
