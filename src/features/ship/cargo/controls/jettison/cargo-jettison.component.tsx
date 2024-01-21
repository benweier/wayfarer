import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { useModalActions } from '@/components/modal'
import * as ShipActions from '@/features/ship/actions'
import { type CargoInventory, type ShipResponse } from '@/types/spacetraders'

export const CargoJettison = ({ ship, item }: { ship: ShipResponse; item: CargoInventory }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalActions()

  return (
    <div className="grid gap-8">
      <h3 className="text-title">{t('general.are_you_sure')}</h3>
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
            closeModal()
          }}
        >
          {(props) => (
            <Button intent="danger" adornment={{ start: <AppIcon id="trash" className="size-5" /> }} {...props}>
              {t('ship.action.confirm_jettison', { context: 'action' })}
            </Button>
          )}
        </ShipActions.Jettison>

        <Button
          onClick={() => {
            closeModal()
          }}
        >
          {t('general.cancel')}
        </Button>
      </div>
    </div>
  )
}
