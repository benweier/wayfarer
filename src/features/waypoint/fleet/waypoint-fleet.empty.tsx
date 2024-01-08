import { Link } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'
import { loginRoute } from '@/routes/auth'
import { useAuthStore } from '@/store/auth'
import { type WaypointResponse } from '@/types/spacetraders'

export const WaypointFleetEmpty = ({ waypoint }: { waypoint: WaypointResponse }) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
      <div className="text-center">
        <Trans
          i18nKey="waypoint.fleet"
          context={isAuthenticated ? 'empty' : 'unauthenticated'}
          components={{
            waypoint_symbol: <span className="font-bold">{waypoint.symbol}</span>,
            login_link: (
              <Link
                to={loginRoute.to}
                search={{ redirect: `/systems/${waypoint.systemSymbol}/waypoint/${waypoint.systemSymbol}` }}
                mask={{ to: loginRoute.to }}
                className="link"
              >
                {t('auth.login', { context: 'action' })}
              </Link>
            ),
          }}
        />
      </div>
    </div>
  )
}
