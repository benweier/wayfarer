import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'

export const Auth = () => {
  return (
    <div css={tw`rounded-lg border-2 border-gray-600 p-6`}>
      <Outlet />
    </div>
  )
}
