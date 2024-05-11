import { MenuIcon } from '@/components/icons'
import { useAuthStore } from '@/store/auth'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { menu } from './menu.conf'

export const DesktopNavigation = () => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  return (
    <nav className="flex flex-col items-center justify-center gap-2 p-4">
      {menu.map((item) => {
        if ('divider' in item) {
          return <div key={item.key} className="my-2 h-0.5 w-full rounded-full bg-white/30" />
        }

        return (
          <Link
            key={item.key}
            to={item.to}
            className="relative flex w-full max-w-full items-center gap-4 rounded-md border-2 border-blue-600 py-2 px-3 font-medium text-white transition-all duration-100 hover:scale-105 hover:bg-blue-50/10 hover:shadow-sm active:scale-100 @[220px]/side:w-full [&.active]:bg-blue-50/20 [&.active]:text-white [&.active]:shadow [&.active]:shadow-blue-800"
          >
            {item.auth && !isAuthenticated && (
              <span className="absolute top-0 left-0 rounded-full bg-blue-100 p-1 text-blue-950">
                <MenuIcon id="key" className="size-2" aria-hidden />
              </span>
            )}
            <div>
              <MenuIcon id={item.icon} className="size-5 text-blue-100" aria-hidden />
            </div>
            <span className="typography-sm sr-only @[220px]/side:not-sr-only">{t(item.key)}</span>
          </Link>
        )
      })}
    </nav>
  )
}
