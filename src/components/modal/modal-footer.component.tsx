import type { PropsWithChildren } from 'react'

export const Footer = ({ children }: PropsWithChildren) => {
  return (
    <div className="-m-6 mt-6 flex flex-col gap-1 border-1 border-transparent border-t-border-tertiary bg-background-primary p-6 pt-5">
      {children}
    </div>
  )
}
