import type { PropsWithChildren } from 'react'

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className="-m-6 mb-6 flex flex-col gap-1 border-1 border-transparent border-b-border-tertiary bg-background-primary p-6 pb-5">
      {children}
    </div>
  )
}
