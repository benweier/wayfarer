import { ReactNode } from 'react'
import tw from 'twin.macro'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div css={tw`h-screen max-w-lg mx-auto px-4 py-4 grid items-center`}>{children}</div>
}
