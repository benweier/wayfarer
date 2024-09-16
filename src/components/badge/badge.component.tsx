import type { PropsWithChildren } from 'react'

export const Badge = ({ children }: PropsWithChildren) => {
  return (
    <div className="typography-sm inline-flex rounded-sm bg-foreground-secondary px-2.5 font-bold text-background-secondary">
      {children}
    </div>
  )
}
