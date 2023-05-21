import { ReactNode } from 'react'

export const Layout = ({ children }: { children?: ReactNode }) => {
  return <div className="grid grid-cols-1 gap-2">{children}</div>
}
