import type { PropsWithChildren } from 'react'

export const Value = ({ children = null }: PropsWithChildren) => {
  if (children === null) return null

  return <div className="text-foreground-primary">{children}</div>
}
