import { HiOutlineCash } from 'react-icons/hi'
import { RiSpaceShipFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { css } from 'styled-components'
import tw, { styled, theme } from 'twin.macro'
import { SpaceTradersStatus } from '@/components/SpaceTradersStatus'
import { Wayfarer } from '@/components/Wayfarer'
import { ROUTES } from '@/config/routes'
import { useMyShipsQuery } from '@/services/spacetraders/core'
import { selectUser } from '@/store/auth'

const HeaderLink = styled(NavLink)(() => [
  tw`py-2 px-4 rounded text-sm font-semibold leading-none`,
  tw`outline-none focus:(ring-2 ring-emerald-400 ring-offset-2 ring-offset-gray-800)`,
  tw`hover:(bg-slate-600) active:(bg-slate-700)`,
  css`
    &.active {
      ${tw`bg-blue-500 text-white`}
    }
  `,
])

const OwnedShips = () => {
  const ownedShipsQuery = useMyShipsQuery()

  return (
    <div css={tw`grid grid-flow-col gap-2 items-center`}>
      <RiSpaceShipFill size={16} /> <span css={tw`font-semibold`}>{ownedShipsQuery.data?.ships.length ?? 0}</span>
    </div>
  )
}

const User = () => {
  const user = useSelector(selectUser)

  if (!user) return <div />

  return (
    <div css={tw`grid grid-flow-col gap-8 items-center`}>
      <div css={tw`grid gap-2 grid-flow-col items-center`}>
        <HiOutlineCash size={20} color={theme`colors.emerald.400`} /> <span css={tw`font-bold`}>{user.credits}</span>
      </div>

      <div>
        <span css={tw`font-bold`}>{user.username}</span>
      </div>
    </div>
  )
}

export const Header = () => {
  return (
    <div css={tw`relative shadow-lg z-50`}>
      <div css={tw`h-16 px-6 grid items-center`}>
        <div css={tw`w-full grid grid-flow-col gap-4 justify-between items-center`}>
          <div css={tw`grid grid-flow-col gap-2 items-center`}>
            <SpaceTradersStatus />

            <Link to="/" css={tw`rounded outline-none focus:(ring ring-emerald-400)`}>
              <Wayfarer css={tw`text-2xl mx-4`} />
            </Link>

            <nav css={tw`grid grid-flow-col gap-2 items-center`}>
              <HeaderLink to={ROUTES.OVERVIEW}>OVERVIEW</HeaderLink>
              <HeaderLink to={ROUTES.MARKETPLACE}>MARKETPLACE</HeaderLink>
              <HeaderLink to={ROUTES.SYSTEMS}>SYSTEMS</HeaderLink>
              <HeaderLink to={ROUTES.LOANS}>LOANS</HeaderLink>
              <HeaderLink to={ROUTES.SHIPS}>SHIPS</HeaderLink>
              <HeaderLink to={ROUTES.LEADERBOARD}>LEADERBOARD</HeaderLink>
            </nav>
          </div>
          <div css={tw`grid grid-flow-col gap-8 items-center`}>
            <OwnedShips />
            <User />
          </div>
        </div>
      </div>
    </div>
  )
}
