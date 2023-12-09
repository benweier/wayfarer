import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useAuthStore } from '@/store/auth'
import { type SystemsResponse } from '@/types/spacetraders'

export const SystemFleetEmpty = ({ system }: { system: SystemsResponse }) => {
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
                to={ROUTES.LOGIN}
                state={{ redirect: { destination: `/systems/${system.symbol}` } }}
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
