import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { useModalActions } from '@/components/modal'
import * as ShipActions from '@/features/ship/actions'
import { type CargoInventory, type ShipResponse } from '@/types/spacetraders'
import { CargoTransferForm } from './cargo-transfer.form'

export const CargoTransfer = ({ ship, item }: { ship: ShipResponse; item: CargoInventory }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalActions()

  return (
    <div className="grid gap-8">
      <h3 className="text-title">{t('cargo.transfer.heading')}</h3>

      <p>{t('cargo.transfer.message')}</p>

      <div className="flex gap-2">
        <ShipActions.TransferCargo ship={ship} item={item}>
          {({ execute }) => (
            <CargoTransferForm
              fromShip={ship}
              onSubmit={async (values) => {
                await execute({
                  toShipSymbol: values.ship,
                  symbol: item.symbol,
                  units: values.quantity,
                })

                closeModal()
              }}
            >
              <div className="flex gap-2">
                <Button type="submit" intent="confirm">
                  {t('cargo.transfer.confirm', { context: 'action' })}
                </Button>
                <Button
                  onClick={() => {
                    closeModal()
                  }}
                >
                  {t('general.cancel')}
                </Button>
              </div>
            </CargoTransferForm>
          )}
        </ShipActions.TransferCargo>
      </div>
    </div>
  )
}
