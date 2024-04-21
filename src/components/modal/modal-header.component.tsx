import type { PropsWithChildren } from 'react'

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-1 p-6 pb-5 -m-6 mb-6 border-1 border-transparent border-b-border-tertiary">
      {children}
    </div>
  )
}
