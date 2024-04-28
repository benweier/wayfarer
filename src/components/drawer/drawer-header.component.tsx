import type { PropsWithChildren } from 'react'

export const Header = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-1 p-6 pb-5 -m-6 mb-6">{children}</div>
}
