import { type PropsWithChildren } from 'react'

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-zinc-200/40 dark:bg-zinc-700/20">
      <div className="mx-auto grid w-full max-w-lg items-center">{children}</div>
    </div>
  )
}
