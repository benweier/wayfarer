import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { useModalActions } from '@/components/modal'
import * as ShipActions from '@/features/ship/actions'
import { CargoTransferForm } from './cargo-transfer.form'
import type { CargoInventory, ShipResponse } from '@/types/spacetraders'

export const CargoTransfer = ({ ship, item }: { ship: ShipResponse; item: CargoInventory }) => {
  const { t } = useTranslation()
  const actions = useModalActions()

  return (
    <div className="space-y-2">
      <ShipActions.TransferCargo ship={ship} item={item}>
        {({ execute }) => (
          <CargoTransferForm
            fromShip={ship}
            onSubmit={(values) => {
              execute({
                toShipSymbol: values.ship,
                symbol: item.symbol,
                units: values.quantity,
              })

              actions.close()
            }}
          >
            <div className="flex gap-2">
              <Button type="submit" intent="info">
                {t('cargo.transfer.confirm', { context: 'action' })}
              </Button>
              <Button
                onClick={() => {
                  actions.close()
                }}
              >
                {t('general.cancel')}
              </Button>
            </div>
          </CargoTransferForm>
        )}
      </ShipActions.TransferCargo>
    </div>
  )
}
