import { cx } from 'class-variance-authority'
import type { PropsWithChildren } from 'react'

export const Header = ({ className, children }: PropsWithChildren<WithClassName>) => {
  return <div className={cx('flex flex-col gap-1 px-5 my-4', className)}>{children}</div>
}
