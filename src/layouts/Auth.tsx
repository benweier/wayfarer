import { FC } from 'react'
import tw from 'twin.macro'

export const AuthLayout: FC = ({ children }) => {
  return <div css={tw`grid items-center max-w-lg w-full mx-auto`}>{children}</div>
}
