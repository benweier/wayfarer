import type { PropsWithChildren } from 'react'

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className="-m-6 mb-6 flex flex-col gap-1 border-b-1 border-b-border-tertiary bg-background-primary/80 p-6 pb-5 backdrop-blur">
      {children}
    </div>
  )
}
