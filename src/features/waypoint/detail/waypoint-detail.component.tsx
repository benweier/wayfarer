import { type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { WaypointTag } from '@/components/waypoint/tag'
import { SystemContext } from '@/context/system.context'
import { WaypointContext, useWaypointResponse } from '@/context/waypoint.context'

export const WaypointDetail = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()
  const waypoint = useWaypointResponse()

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 gap-y-2">
          <WaypointTag type={waypoint.type}>{t(waypoint.type, { ns: 'spacetraders.waypoint_type' })}</WaypointTag>
          <div className="text-sm font-light">
            ({waypoint.x}, {waypoint.y})
          </div>
          <div className="whitespace-nowrap">
            {t('system.label')}:{' '}
            <Link className="link" to={`/systems/${waypoint.systemSymbol}`}>
              {waypoint.systemSymbol}
            </Link>
          </div>
          {!!waypoint.orbits && (
            <div className="whitespace-nowrap">
              Orbits:{' '}
              <Link className="link" to={`/systems/${waypoint.systemSymbol}/waypoint/${waypoint.orbits}`}>
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
          <div className="text-sm">Orbitals</div>
          <div className="flex flex-wrap gap-1">
            {waypoint.orbitals.map((orbital) => (
              <div key={orbital.symbol} className="rounded bg-zinc-200/50 px-4 py-2 shadow-sm dark:bg-zinc-700/25">
                <Link className="link" to={`/systems/${waypoint.systemSymbol}/waypoint/${orbital.symbol}`}>
                  {orbital.symbol}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <SystemContext.Provider value={{ systemSymbol: waypoint.systemSymbol }}>
        <WaypointContext.Provider value={{ waypointSymbol: waypoint.symbol }}>{children}</WaypointContext.Provider>
      </SystemContext.Provider>
    </div>
  )
}
