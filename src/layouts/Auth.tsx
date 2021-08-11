import { ReactNode } from 'react'
import tw from 'twin.macro'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div css={tw`h-screen w-full max-w-4xl mx-auto py-16 flex justify-center items-center`}>{children}</div>
}
