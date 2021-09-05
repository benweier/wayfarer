import { ReactNode } from 'react'
import tw from 'twin.macro'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div css={tw`h-screen max-w-lg mx-auto py-16 grid items-center`}>{children}</div>
}
