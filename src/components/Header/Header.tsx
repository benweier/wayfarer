import { HiOutlineCash } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { SpaceTradersStatus } from 'components/SpaceTradersStatus'
import { Wayfarer } from 'components/Wayfarer'
import { ROUTES } from 'config/routes'
import { selectUser } from 'store/auth'
import { selectStatus } from 'store/auth/selectors'

const HeaderLink = styled(Link)(
  () => tw`py-2 px-4 rounded text-sm font-medium leading-none hover:(bg-blue-500 bg-opacity-80) active:(bg-opacity-60)`,
)

const Sync = () => {
  const status = useSelector(selectStatus)

  return (
    <div
      css={[
        tw`inline-block w-2.5 h-2.5 rounded-full`,
        status === 'IDLE' && tw`bg-emerald-400`,
        status === 'PENDING' && tw`bg-yellow-400`,
        status === 'ERROR' && tw`bg-rose-400`,
      ]}
    />
  )
}

const User = () => {
  const user = useSelector(selectUser)

  if (!user) return <div />

  return (
    <div css={tw`grid grid-flow-col gap-8 items-center`}>
      <div css={tw`grid gap-2 grid-flow-col items-center`}>
        <HiOutlineCash size={20} /> <span css={tw`font-bold`}>{user.credits}</span>
      </div>

      <div css={tw`grid gap-2 grid-flow-col items-center`}>
        <span css={tw`font-bold`}>{user.username}</span>
        <Sync />
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

            <Link to="/">
              <Wayfarer css={tw`text-2xl mx-4`} />
            </Link>

            <nav css={tw`grid grid-flow-col gap-2 items-center`}>
              <HeaderLink to={ROUTES.DASHBOARD}>DASHBOARD</HeaderLink>
              <HeaderLink to={ROUTES.LOANS}>LOANS</HeaderLink>
              <HeaderLink to={ROUTES.SHIPS}>SHIPS</HeaderLink>
            </nav>
          </div>

          <User />
        </div>
      </div>
    </div>
  )
}
