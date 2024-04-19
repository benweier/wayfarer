import { Button } from '@/components/button'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import * as ContractActions from '@/features/contract/actions'
import { useTranslation } from 'react-i18next'
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
      <div className="space-y-8">
        <div className="display-sm">{t('contract.deliver_heading')}</div>

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
