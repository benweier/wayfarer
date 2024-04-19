import { useAuthStore } from '@/store/auth'
import type { WaypointResponse } from '@/types/spacetraders'
import { Link } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'

export const WaypointFleetEmpty = ({ waypoint }: { waypoint: WaypointResponse }) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="border-border-primary rounded border-2 border-dashed py-9 px-3">
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
