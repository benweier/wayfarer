import { HiOutlineCash } from 'react-icons/hi'
import { RiSpaceShipFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { css } from 'styled-components'
import tw, { styled, theme } from 'twin.macro'
import { Grid } from '@/components/Grid'
import { SpaceTradersStatus } from '@/components/SpaceTradersStatus'
import { Typography } from '@/components/Typography'
import { Wayfarer } from '@/components/Wayfarer'
import { ROUTES } from '@/config/routes'
import { useMyShipsQuery } from '@/services/spacetraders/core'
import { selectUser } from '@/store/auth'
import { selectStatus } from '@/store/auth/selectors'

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

export const Sync = () => {
  const status = useSelector(selectStatus)

  return (
    <div
      css={[
        tw`inline-block w-2.5 h-2.5 rounded-full`,
        status === 'IDLE' && tw`bg-emerald-400`,
        status === 'PENDING' && tw`bg-yellow-300`,
        status === 'ERROR' && tw`bg-rose-400`,
      ]}
    />
  )
}

const OwnedShips = () => {
  const ownedShipsQuery = useMyShipsQuery()

  return (
    <Grid cols={2} gap={2} align="center">
      <RiSpaceShipFill size={16} /> <Typography weight="semibold">{ownedShipsQuery.data?.ships.length ?? 0}</Typography>
    </Grid>
  )
}

const User = () => {
  const user = useSelector(selectUser)

  if (!user) return <></>

  return (
    <Grid cols="auto" gap={8} align="center">
      <Grid cols="auto" gap={2} align="center">
        <HiOutlineCash size={20} color={theme`colors.emerald.400`} /> <span css={tw`font-bold`}>{user.credits}</span>
      </Grid>

      <Typography weight="bold">{user.username}</Typography>
    </Grid>
  )
}

export const Header = () => {
  return (
    <div css={tw`relative shadow-lg z-50`}>
      <Grid align="center" css={tw`h-16 px-6`}>
        <Grid cols="auto" justify="between" align="center" gap={4}>
          <Grid cols="auto" align="center" gap={2}>
            <SpaceTradersStatus />

            <Link to="/" css={tw`rounded outline-none focus:(ring ring-emerald-400)`}>
              <Wayfarer css={tw`text-2xl mx-4`} />
            </Link>

            <Grid as="nav" cols="auto" gap={2} align="center">
              <HeaderLink to={ROUTES.OVERVIEW}>OVERVIEW</HeaderLink>
              <HeaderLink to={ROUTES.MARKETPLACE}>MARKETPLACE</HeaderLink>
              <HeaderLink to={ROUTES.SYSTEMS}>SYSTEMS</HeaderLink>
              <HeaderLink to={ROUTES.LOANS}>LOANS</HeaderLink>
              <HeaderLink to={ROUTES.SHIPS}>SHIPS</HeaderLink>
              <HeaderLink to={ROUTES.LEADERBOARD}>LEADERBOARD</HeaderLink>
            </Grid>
          </Grid>
          <Grid cols="auto" gap={8} align="center">
            <OwnedShips />
            <User />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
