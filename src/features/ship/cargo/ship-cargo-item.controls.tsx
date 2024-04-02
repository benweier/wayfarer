import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTranslation } from 'react-i18next'
import { AppIcon } from '@/components/icons'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { useShipResponse } from '@/context/ship.context'
import { type CargoInventory } from '@/types/spacetraders'
import { CargoJettison } from './controls/jettison'
import { CargoTransfer } from './controls/transfer'

export const ShipCargoItemControls = ({ item }: { item: CargoInventory }) => {
  const { t } = useTranslation()
  const jettison = useModalImperativeHandle()
  const transfer = useModalImperativeHandle()
  const ship = useShipResponse()

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="btn btn-icon data-[state=open]:bg-blue-500 data-[state=open]:text-white">
            <span className="sr-only">Manage</span>
            <AppIcon id="more:vertical" className="size-4" aria-hidden="true" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-background-secondary flex w-52 flex-col gap-2 overflow-y-auto rounded-md p-1 ring-3 ring-black/5 backdrop-blur-lg dark:ring-white/5"
            sideOffset={5}
            collisionPadding={16}
          >
            <DropdownMenu.Item asChild>
              <button
                className="btn btn-flat btn-sm data-[highlighted]:btn-dim w-full text-left"
                onClick={() => {
                  transfer.modal.open()
                }}
              >
                {t('ship.action.transfer')}
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <button
                className="btn btn-flat btn-sm data-[highlighted]:btn-dim w-full text-left"
                onClick={() => {
                  jettison.modal.open()
                }}
              >
                {t('ship.action.jettison')}
              </button>
            </DropdownMenu.Item>

            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <Modal ref={transfer.ref} size="sm" closeable>
        <CargoTransfer ship={ship} item={item} />
      </Modal>

      <Modal ref={jettison.ref} size="sm" closeable>
        <CargoJettison ship={ship} item={item} />
      </Modal>
    </>
  )
}
