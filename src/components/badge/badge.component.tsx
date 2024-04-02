import { type PropsWithChildren } from 'react'

export const Badge = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-background-secondary bg-foreground-secondary typography-xs rounded-sm px-2.5 font-bold">
      {children}
    </div>
  )
}
