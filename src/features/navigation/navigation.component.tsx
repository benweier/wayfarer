import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { MenuIcon } from '@/components/icons'
import { ROUTES } from '@/config/routes'

const menu: Array<{ key: string; href: string; icon: string } | { key: 'divider'; divider: true }> = [
  // { name: 'Overview', href: ROUTES.OVERVIEW, icon: 'home' },
  // { name: 'Contracts', href: ROUTES.CONTRACTS, icon: 'contracts' },
  { key: 'navigation.fleet', href: ROUTES.FLEET, icon: 'fleet' },
  { key: 'navigation.systems', href: ROUTES.SYSTEMS, icon: 'systems' },
  { key: 'divider', divider: true },
  { key: 'navigation.leaderboard', href: ROUTES.LEADERBOARD, icon: 'leaderboard' },
  { key: 'navigation.agents', href: ROUTES.AGENTS, icon: 'agents' },
]

export const Navigation = () => {
  const { t } = useTranslation()

  return (
    <nav className="flex flex-col items-center justify-center gap-2 p-4">
      {menu.map((item) => {
        if ('divider' in item) {
          return <div key={item.key} className="my-2 h-1 w-full rounded-full bg-zinc-100/20"></div>
        }

        return (
          <NavLink
            key={item.key}
            to={item.href}
            className="flex w-full items-center gap-4 overflow-hidden rounded-md border-2 border-blue-600 px-3 py-2 font-semibold text-blue-200 transition-all duration-100 hover:scale-105 hover:bg-blue-50/10 hover:shadow-sm active:scale-100 @[220px]/side:w-full [&.active]:bg-blue-50/20 [&.active]:text-white [&.active]:shadow [&.active]:shadow-blue-800"
          >
            <div>
              <MenuIcon id={item.icon} className="size-5" aria-hidden />
            </div>
            <span className="sr-only text-sm @[220px]/side:not-sr-only">{t(item.key)}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
