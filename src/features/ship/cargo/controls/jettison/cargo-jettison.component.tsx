import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { useModalActions } from '@/components/modal'
import * as ShipActions from '@/features/ship/actions'
import type { CargoInventory, ShipResponse } from '@/types/spacetraders'

export const CargoJettison = ({ ship, item }: { ship: ShipResponse; item: CargoInventory }) => {
  const { t } = useTranslation()
  const modal = useModalActions()

  return (
    <div className="space-y-8">
      <div>
        {t('ship.action.confirm_jettison', {
          itemSymbol: item.symbol,
          units: item.units,
          context: 'text',
        })}
      </div>
      <div className="flex gap-2">
        <ShipActions.Jettison
          ship={ship}
          symbol={item.symbol}
          units={item.units}
          onDone={() => {
            modal.close()
          }}
        >
          {({ disabled, execute }) => (
            <Button
              intent="danger"
              adornment={{ start: <AppIcon id="trash" className="size-5" /> }}
              disabled={disabled}
              onClick={() => execute()}
            >
              {t('ship.action.confirm_jettison', { context: 'action' })}
            </Button>
          )}
        </ShipActions.Jettison>

        <Button
          onClick={() => {
            modal.close()
          }}
        >
          {t('general.cancel')}
        </Button>
      </div>
    </div>
  )
}
