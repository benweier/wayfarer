import { useQuery } from '@tanstack/react-query'
import { HiOutlineCash } from 'react-icons/hi'
import { RiSpaceShipFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link, NavLink, NavLinkProps } from 'react-router-dom'
import { SpaceTradersStatus } from '@/components/SpaceTradersStatus'
import { Wayfarer } from '@/components/Wayfarer'
import { ROUTES } from '@/config/routes'
import { myShipsQuery } from '@/services/api/spacetraders/ships'
import { selectUser } from '@/store/auth'

const MenuItem = ({ children, ...props }: NavLinkProps) => {
  return (
    <NavLink
      {...props}
      className="rounded py-2 px-4 text-sm font-bold leading-none outline-none ring-emerald-400 ring-offset-2 hover:bg-zinc-200 focus:ring-2 focus:ring-offset-gray-800 dark:hover:bg-zinc-700 [&.active]:bg-blue-500 [&.active]:text-white"
    >
      {children}
    </NavLink>
  )
}

const OwnedShips = () => {
  const { isSuccess, data } = useQuery(['my-ships'], () => myShipsQuery())

  const ships = isSuccess ? data.data?.ships.length ?? 0 : 0

  return (
    <div className="grid grid-flow-col items-center gap-2">
      <RiSpaceShipFill size={16} /> <span className="font-semibold">{ships}</span>
    </div>
  )
}

const User = () => {
  const user = useSelector(selectUser)

  if (!user) return <div />

  return (
    <div className="grid grid-flow-col items-center gap-8">
      <div className="grid grid-flow-col items-center gap-2 text-emerald-400">
        <HiOutlineCash size={20} /> <span className="font-bold">{user.credits}</span>
      </div>

      <div>
        <span className="font-bold">{user.username}</span>
      </div>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="relative z-50">
      <div className="grid h-16 items-center px-6">
        <div className="grid w-full grid-flow-col items-center justify-between gap-4">
          <div className="grid grid-flow-col items-center gap-2">
            <SpaceTradersStatus />

            <Link to="/" className="mx-3 rounded px-3 py-0.5 outline-none focus:ring focus:ring-emerald-400">
              <Wayfarer className="text-lg leading-none" />
            </Link>

            <nav className="grid grid-flow-col items-center gap-2">
              <MenuItem to={ROUTES.OVERVIEW}>OVERVIEW</MenuItem>
              <MenuItem to={ROUTES.MARKETPLACE}>MARKETPLACE</MenuItem>
              <MenuItem to={ROUTES.SYSTEMS}>SYSTEMS</MenuItem>
              <MenuItem to={ROUTES.LOANS}>LOANS</MenuItem>
              <MenuItem to={ROUTES.SHIPS}>SHIPS</MenuItem>
              <MenuItem to={ROUTES.LEADERBOARD}>LEADERBOARD</MenuItem>
            </nav>
          </div>
          <div className="grid grid-flow-col items-center gap-8">
            <OwnedShips />
            <User />
          </div>
        </div>
      </div>
    </div>
  )
}
