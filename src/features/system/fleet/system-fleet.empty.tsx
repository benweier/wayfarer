import { Link } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/auth'
import type { SystemFleetProps } from './system-fleet.types'

export const SystemFleetEmpty = ({ system }: SystemFleetProps) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="rounded border-2 border-border-primary border-dashed px-3 py-9">
      <div className="text-center">
        <Trans
          i18nKey="system.fleet"
          context={isAuthenticated ? 'empty' : 'unauthenticated'}
          components={{
            system_symbol: <span className="font-bold">{system.symbol}</span>,
            login_link: (
              <Link
                to="/login"
                search={{ redirect: `/systems/${system.symbol}` }}
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
