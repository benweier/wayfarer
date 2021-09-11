import { ReactNode } from 'react'
import tw from 'twin.macro'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div css={tw`h-screen w-full px-4 py-4 grid items-center`}>
      <div css={tw`h-8 w-full grid items-center`}></div>
      <div css={tw`mx-auto max-w-lg w-full px-4 py-4`}>{children}</div>
      <div css={tw`h-8 w-full grid items-center`}></div>
    </div>
  )
}
