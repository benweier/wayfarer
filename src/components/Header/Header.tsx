import { HiCurrencyDollar } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { Wayfarer } from 'components/Wayfarer'
import { ROUTES } from 'config/routes'
import { selectUser } from 'store/auth'
import { selectStatus } from 'store/auth/selectors'

const HeaderLink = styled(Link)(
  () => tw`py-2 px-4 rounded font-medium leading-none hover:(bg-blue-500 bg-opacity-80) active:(bg-opacity-60)`,
)

const Status = () => {
  const status = useSelector(selectStatus)

  return (
    <div
      css={[
        tw`inline-block w-2.5 h-2.5 rounded-full`,
        status === 'IDLE' && tw`bg-emerald-400`,
        status === 'PENDING' && tw`bg-yellow-300`,
        status === 'ERROR' && tw`bg-rose-500`,
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
        <HiCurrencyDollar size={20} /> <span css={tw`font-bold`}>{user.credits}</span>
      </div>

      <div css={tw`grid gap-2 grid-flow-col items-center`}>
        <span css={tw`font-bold`}>{user.username}</span>
        <Status />
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
            <Link to="/">
              <Wayfarer css={tw`text-2xl mx-4`} />
            </Link>

            <nav css={tw`grid grid-flow-col gap-2 items-center`}>
              <HeaderLink to={ROUTES.LOANS}>Loans</HeaderLink>
              <HeaderLink to={ROUTES.SHIPS}>Ships</HeaderLink>
            </nav>
          </div>

          <User />
        </div>
      </div>
    </div>
  )
}
