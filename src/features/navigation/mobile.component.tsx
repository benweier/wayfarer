import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useDrawerActions } from '@/components/drawer'
import { MenuIcon } from '@/components/icons'
import { Popover } from '@/components/popover'
import { Theme } from '@/components/preferences/theme.component'
import { useAuthStore } from '@/store/auth'
import { menu } from './menu.conf'

export const MobileNavigation = () => {
  const actions = useDrawerActions()
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="flex grow flex-col justify-between gap-2">
      <nav className="flex flex-col items-center gap-2">
        {menu.map((item) => {
          if ('divider' in item) {
            return <div key={item.key} className="my-2 h-0.5 w-full rounded-full bg-background-tertiary" />
          }

          return (
            <Link
              key={item.key}
              to={item.to}
              onClick={actions.close}
              className="relative flex w-full items-center gap-4 rounded-md px-3 py-2 font-medium text-foreground-secondary transition-colors duration-75 hover:bg-background-tertiary focus:bg-background-active [&.active]:bg-background-active [&.active]:text-foreground-primary"
            >
              {item.auth && !isAuthenticated && (
                <span className="absolute top-0 left-0 rounded-full bg-foreground-secondary p-1 text-background-secondary">
                  <MenuIcon id="key" className="size-3" aria-hidden />
                </span>
              )}

              <MenuIcon id={item.icon} className="size-5" aria-hidden />

              <span className="text-sm">{t(item.key)}</span>
            </Link>
          )
        })}
      </nav>
      <div className="flex flex-col items-center gap-2">
        <Popover
          trigger={
            <button
              type="button"
              className="group relative flex w-full items-center gap-4 rounded-md px-3 py-2 font-medium text-foreground-primary transition-colors duration-75 hover:bg-background-tertiary focus:bg-background-active [&.active]:bg-background-active [&.active]:text-white"
            >
              <MenuIcon id="settings" className="size-6 group-data-[state=open]:animate-spin" aria-hidden />
              <span className="text-sm">{t('preferences.label')}</span>
            </button>
          }
        >
          <Theme />
        </Popover>

        {isAuthenticated ? (
          <Link
            to="/logout"
            className="relative flex w-full items-center gap-4 rounded-md px-3 py-2 font-medium text-foreground-primary transition-colors duration-75 hover:bg-background-error-primary focus:bg-background-error-primary"
          >
            <MenuIcon id="logout" className="size-5" aria-hidden />
            <span className="text-sm">{t('auth.logout', { context: 'action' })}</span>
          </Link>
        ) : (
          <Link
            to="/login"
            search={{
              redirect: `${window.location.pathname}${window.location.search}`,
            }}
            mask={{ to: '/login' }}
            className="relative flex w-full items-center gap-4 rounded-md px-3 py-2 font-medium text-foreground-primary transition-colors duration-75 hover:bg-background-success-primary focus:bg-background-success-primary"
          >
            <MenuIcon id="login" className="size-5" aria-hidden />
            <span className="text-sm">{t('auth.login', { context: 'action' })}</span>
          </Link>
        )}
      </div>
    </div>
  )
}
