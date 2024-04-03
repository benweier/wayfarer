import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { ShipIcon } from '@/components/icons'
import { useShipResponse } from '@/context/ship.context'
import { RemoveMount } from '@/features/ship/actions'
import { ShipLoadoutItem } from './ship-loadout-item.component'
import { type ShipLoadoutListProps } from './ship-loadout.types'

export const ShipLoadoutList = ({ Item = ShipLoadoutItem }: ShipLoadoutListProps) => {
  const { t } = useTranslation()
  const ship = useShipResponse()

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <div className="text-secondary typography-sm uppercase">{t('ship.loadout.frame')}</div>
            <div className="text-overline">{ship.frame.name}</div>
            <div className="w-4/5">{ship.frame.description}</div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShipIcon id="modules" className="size-5 text-lime-500" />
                <div>{ship.frame.moduleSlots}</div>
              </div>
              <div className="text-secondary typography-xs uppercase">{t('ship.loadout.module_slots')}</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShipIcon id="mounts" className="size-5 text-orange-500" />
                <div>{ship.frame.mountingPoints}</div>
              </div>
              <div className="text-secondary typography-xs uppercase">{t('ship.loadout.mounting_points')}</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="size-5 text-indigo-500" />
                <div>{ship.frame.requirements.power}</div>
              </div>
              <div className="text-secondary typography-xs uppercase">{t('ship.loadout.power_required')}</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-secondary typography-sm uppercase">{t('ship.loadout.reactor')}</div>
            <Item name={ship.reactor.name} description={ship.reactor.description}>
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="size-5 text-indigo-500" />
                <div>{ship.reactor.powerOutput}</div>
              </div>
            </Item>
          </div>

          <div className="space-y-2">
            <div className="text-secondary typography-sm uppercase">{t('ship.loadout.engine')}</div>
            <Item name={ship.engine.name} description={ship.engine.description}>
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="size-5 text-indigo-500" />
                <div>{ship.engine.requirements.power}</div>
              </div>
            </Item>
          </div>
        </div>
      </div>

      {ship.frame.moduleSlots > 0 && (
        <div className="space-y-2">
          <div className="text-secondary typography-sm uppercase">
            {t('ship.loadout.modules')} (
            {`${ship.modules.reduce((count, module) => {
              count = count + module.requirements.slots

              return count
            }, 0)}/${ship.frame.moduleSlots}`}
            )
          </div>
          <div className="grid grid-cols-3 gap-2">
            {ship.modules.map((module, index) => (
              <Item key={index} name={module.name} description={module.description}>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <ShipIcon id="modules" className="size-4 text-lime-500" />
                    <div className="typography-sm">{module.requirements.slots}</div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ShipIcon id="crew" className="size-4 text-amber-500" />
                    <div className="typography-sm">{module.requirements.crew}</div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ShipIcon id="power" className="size-4 text-indigo-500" />
                    <div className="typography-sm">{module.requirements.power}</div>
                  </div>
                </div>
              </Item>
            ))}
          </div>
        </div>
      )}
      {ship.frame.mountingPoints > 0 && (
        <div className="space-y-2">
          <div className="text-secondary typography-sm uppercase">
            {t('ship.loadout.mounts')} ({`${ship.mounts.length}/${ship.frame.mountingPoints}`})
          </div>
          <div className="grid grid-cols-3 gap-2">
            {ship.mounts.map((mount, index) => (
              <Item
                key={index}
                name={mount.name}
                description={mount.description}
                action={
                  <RemoveMount ship={ship} mountSymbol={mount.symbol}>
                    {(props) => (
                      <Button intent="danger" kind="outline" size="small" {...props}>
                        {t('ship.loadout.remove')}
                      </Button>
                    )}
                  </RemoveMount>
                }
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <ShipIcon id="crew" className="size-4 text-amber-500" />
                    <div className="typography-sm">{mount.requirements.crew}</div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ShipIcon id="power" className="size-4 text-indigo-500" />
                    <div className="typography-sm">{mount.requirements.power}</div>
                  </div>
                </div>
              </Item>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
