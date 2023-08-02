import { type PropsWithChildren } from 'react'

export const Badge = ({ children }: PropsWithChildren) => {
  return (
    <span className="text-primary text-inverse rounded-sm bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
      {children}
    </span>
  )
}
