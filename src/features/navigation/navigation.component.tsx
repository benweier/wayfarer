import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { MenuIcon } from '@/components/icons'
import { agentsRoute } from '@/routes/agents'
import { contractsRoute } from '@/routes/contracts'
import { fleetRoute } from '@/routes/fleet'
import { leaderboardRoute } from '@/routes/leaderboard'
import { surveysRoute } from '@/routes/surveys'
import { systemsRoute } from '@/routes/systems'

const menu: Array<{ key: string; href: string; icon: string } | { key: 'divider'; divider: true }> = [
  { key: 'navigation.fleet', href: fleetRoute.to, icon: 'fleet' },
  { key: 'navigation.systems', href: systemsRoute.to, icon: 'systems' },
  { key: 'navigation.contracts', href: contractsRoute.to, icon: 'contracts' },
  { key: 'navigation.surveys', href: surveysRoute.to, icon: 'surveys' },
  { key: 'divider', divider: true },
  { key: 'navigation.leaderboard', href: leaderboardRoute.to, icon: 'leaderboard' },
  { key: 'navigation.agents', href: agentsRoute.to, icon: 'agents' },
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
          <Link
            key={item.key}
            to={item.href}
            className="flex w-full max-w-full items-center gap-4 rounded-md border-2 border-blue-600 px-3 py-2 font-medium text-white transition-all duration-100 hover:scale-105 hover:bg-blue-50/10 hover:shadow-sm active:scale-100 @[220px]/side:w-full [&.active]:bg-blue-50/20 [&.active]:text-white [&.active]:shadow [&.active]:shadow-blue-800"
          >
            <div>
              <MenuIcon id={item.icon} className="size-5 text-blue-100" aria-hidden />
            </div>
            <span className="sr-only text-sm @[220px]/side:not-sr-only">{t(item.key)}</span>
          </Link>
        )
      })}
    </nav>
  )
}
