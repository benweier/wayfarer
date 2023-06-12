import { Link } from 'react-router-dom'
import { SystemTag } from '@/components/system/tag'
import { SYSTEM_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { cx } from '@/utilities/cx'
import { SystemItemProps } from './system-item.types'

export const SystemItem = ({ system, hasShipPresence = false, children }: SystemItemProps) => {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-between gap-2 rounded border-2 bg-zinc-200/50 p-4 shadow-sm dark:bg-zinc-700/25 md:flex-row md:flex-wrap',
        {
          'border-transparent': !hasShipPresence,
          'border-blue-500': hasShipPresence,
        },
      )}
    >
      <div className="flex gap-1">
        <div className="flex flex-col gap-1">
          <div>
            <Link className="link text-lg" to={`${ROUTES.SYSTEMS}/${system.symbol}`}>
              {system.symbol}
            </Link>
          </div>
          <div className="flex flex-row items-center justify-start gap-4">
            <SystemTag type={system.type}>{SYSTEM_TYPE.get(system.type)}</SystemTag>{' '}
            <span className="text-sm font-light">
              ({system.x}, {system.y})
            </span>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
