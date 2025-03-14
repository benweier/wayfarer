import { Link } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/auth'
import type { WaypointResponse } from '@/types/spacetraders'

export const WaypointFleetEmpty = ({ waypoint }: { waypoint: WaypointResponse }) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="rounded border-2 border-border-primary border-dashed px-3 py-9">
      <div className="text-center">
        <Trans
          i18nKey="waypoint.fleet"
          context={isAuthenticated ? 'empty' : 'unauthenticated'}
          components={{
            waypoint_symbol: <span className="font-bold">{waypoint.symbol}</span>,
            login_link: (
              <Link
                to="/login"
                search={{ redirect: `/systems/${waypoint.systemSymbol}/waypoint/${waypoint.symbol}` }}
                mask={{ to: '/login' }}
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
