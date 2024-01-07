import { Link } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'
import { loginRoute } from '@/routes/auth.route'
import { useAuthStore } from '@/store/auth'
import { type SystemFleetProps } from './system-fleet.types'

export const SystemFleetEmpty = ({ system }: SystemFleetProps) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
      <div className="text-center">
        <Trans
          i18nKey="system.fleet"
          context={isAuthenticated ? 'empty' : 'unauthenticated'}
          components={{
            system_symbol: <span className="font-bold">{system.symbol}</span>,
            login_link: (
              <Link
                to={loginRoute.to}
                search={{ redirect: `/systems/${system.symbol}` }}
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
