import { type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Card } from '@/components/card'
import { ShipIcon } from '@/components/icons'
import { SystemTag } from '@/components/system/tag'
import { ROUTES } from '@/config/routes'
import { type SystemItemProps } from './system-item.types'

export const SystemItem = ({ system, hasShipPresence = false, children }: PropsWithChildren<SystemItemProps>) => {
  const { t } = useTranslation()

  return (
    <Card className="@container/system-item">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:flex-wrap">
        <div className="flex gap-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Link className="link text-lg" to={`${ROUTES.SYSTEMS}/${system.symbol}`}>
                {system.symbol}
              </Link>
              {hasShipPresence && (
                <span title="You have a ship in this system">
                  <ShipIcon id="anchor" className="h-4 w-4" />
                </span>
              )}
            </div>
            <div className="flex flex-row items-center justify-start gap-4">
              <SystemTag type={system.type}>{t(system.type, { ns: 'spacetraders.system_type' })}</SystemTag>
              <span className="text-sm font-light">
                ({system.x}, {system.y})
              </span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </Card>
  )
}
