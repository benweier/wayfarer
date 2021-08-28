import { Link, Outlet, useParams } from 'react-router-dom'
import tw from 'twin.macro'

export const Auth = () => {
  const params = useParams()

  console.log(params)

  return (
    <div css={tw`w-full rounded-lg border-2 border-gray-600 p-6`}>
      <div css={tw`grid grid-cols-1 gap-6`}>
        <nav css={tw`flex justify-between items-center`} aria-label="Tabs">
          <Link css={tw`py-3 px-5`} to="login">
            Login
          </Link>
          <Link css={tw`py-3 px-5`} to="register">
            Register
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  )
}
