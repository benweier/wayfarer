import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { useWaypointResponse } from '@/context/waypoint.context'
import { WaypointTag } from '@/features/waypoint/tag'
import type { PropsWithChildren } from 'react'

export const WaypointDetail = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()
  const waypoint = useWaypointResponse()

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 gap-y-2">
          <WaypointTag type={waypoint.type}>{t(waypoint.type, { ns: 'spacetraders.waypoint_type' })}</WaypointTag>
          <div className="text-sm font-light">
            ({waypoint.x}, {waypoint.y})
          </div>
          <div className="whitespace-nowrap">
            {t('system.label')}:{' '}
            <Link to="/systems/$systemSymbol" params={{ systemSymbol: waypoint.systemSymbol }} className="link">
              {waypoint.systemSymbol}
            </Link>
          </div>
          {!!waypoint.orbits && (
            <div className="whitespace-nowrap">
              {t('waypoint.orbits')}:{' '}
              <Link
                to="/systems/$systemSymbol/waypoint/$waypointSymbol"
                params={{ systemSymbol: waypoint.systemSymbol, waypointSymbol: waypoint.orbits }}
                className="link"
              >
                {waypoint.orbits}
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {waypoint.traits.map((trait) => (
            <Badge key={trait.symbol}>{trait.name}</Badge>
          ))}
        </div>
      </div>

      {waypoint.orbitals.length > 0 && (
        <div className="space-y-1">
          <div className="text-xs text-foreground-secondary uppercase">{t('waypoint.orbitals')}</div>
          <div className="flex flex-wrap gap-1">
            {waypoint.orbitals
              .toSorted((a, b) => a.symbol.localeCompare(b.symbol))
              .map((orbital) => (
                <div key={orbital.symbol} className="rounded bg-background-secondary px-4 py-2 shadow-sm">
                  <Link
                    to="/systems/$systemSymbol/waypoint/$waypointSymbol"
                    params={{ systemSymbol: waypoint.systemSymbol, waypointSymbol: orbital.symbol }}
                    className="link"
                  >
                    {orbital.symbol}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}

      {children}
    </div>
  )
}
