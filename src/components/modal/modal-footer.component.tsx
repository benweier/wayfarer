import type { PropsWithChildren } from 'react'

export const Footer = ({ children }: PropsWithChildren) => {
  return (
    <div className="-m-6 mt-6 flex flex-col gap-1 border-t-2 border-t-border-tertiary bg-background-primary/80 p-6 pt-5 backdrop-blur-lg backdrop-brightness-150">
      {children}
    </div>
  )
}
