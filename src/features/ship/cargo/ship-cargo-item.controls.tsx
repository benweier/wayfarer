import { useTranslation } from 'react-i18next'
import * as Dropdown from '@/components/dropdown'
import { AppIcon } from '@/components/icons'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { useShipResponse } from '@/context/ship.context'
import { CargoJettison } from './controls/jettison'
import { CargoTransfer } from './controls/transfer'
import type { CargoInventory } from '@/types/spacetraders'

export const ShipCargoItemControls = ({ item }: { item: CargoInventory }) => {
  const { t } = useTranslation()
  const jettison = useModalImperativeHandle()
  const transfer = useModalImperativeHandle()
  const ship = useShipResponse()

  return (
    <>
      <Dropdown.Field
        trigger={
          <button type="button" className="btn btn-icon data-[state=open]:bg-blue-500 data-[state=open]:text-white">
            <span className="sr-only">Manage</span>
            <AppIcon id="more:vertical" className="size-4" aria-hidden="true" />
          </button>
        }
      >
        <Dropdown.Item
          onSelect={() => {
            transfer.modal.open()
          }}
        >
          <Dropdown.ItemIcon>
            <AppIcon id="transfer" className="size-4" aria-hidden="true" />
          </Dropdown.ItemIcon>
          {t('ship.action.transfer')}
        </Dropdown.Item>
        <Dropdown.Item
          variant="danger"
          onSelect={() => {
            jettison.modal.open()
          }}
        >
          <Dropdown.ItemIcon>
            <AppIcon id="trash" className="size-4" aria-hidden="true" />
          </Dropdown.ItemIcon>
          {t('ship.action.jettison')}
        </Dropdown.Item>
      </Dropdown.Field>

      <Modal ref={transfer.ref} size="sm" close={<Modal.Close />}>
        <Modal.Content
          header={
            <Modal.Header>
              <Modal.Title>{t('cargo.transfer.heading')}</Modal.Title>
              <Modal.Description>{t('cargo.transfer.message')}</Modal.Description>
            </Modal.Header>
          }
        >
          <CargoTransfer ship={ship} item={item} />
        </Modal.Content>
      </Modal>

      <Modal ref={jettison.ref} size="sm" close={<Modal.Close />}>
        <Modal.Content
          header={
            <Modal.Header>
              <Modal.Title>{t('general.are_you_sure')}</Modal.Title>
            </Modal.Header>
          }
        >
          <CargoJettison ship={ship} item={item} />
        </Modal.Content>
      </Modal>
    </>
  )
}
