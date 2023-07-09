import { NavLink } from 'react-router-dom'
import { MenuIcon } from '@/components/icons'
import { ROUTES } from '@/config/routes'

const menu = [
  // { name: 'Overview', href: ROUTES.OVERVIEW, icon: 'home' },
  // { name: 'Contracts', href: ROUTES.CONTRACTS, icon: 'contracts' },
  { name: 'Fleet', href: ROUTES.FLEET, icon: 'fleet' },
  { name: 'Systems', href: ROUTES.SYSTEMS, icon: 'systems' },
]

export const Navigation = () => {
  return (
    <nav className="flex flex-col items-center justify-center gap-2 p-4">
      {menu.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className="flex w-full items-center gap-4 overflow-hidden rounded-md border-2 border-blue-600 px-3 py-2 font-semibold text-blue-200 transition-all duration-100 hover:scale-105 hover:bg-blue-50/10 hover:shadow-sm active:scale-100 @[220px]/side:w-full [&.active]:bg-blue-50/20 [&.active]:text-white [&.active]:shadow [&.active]:shadow-blue-800"
        >
          <div>
            <MenuIcon id={item.icon} className="h-5 w-5" aria-hidden />
          </div>
          <span className="sr-only text-sm @[220px]/side:not-sr-only">{item.name}</span>
        </NavLink>
      ))}
    </nav>
  )
}
