import { cx } from '@/utilities/cx.helper'
import type { PropsWithChildren } from 'react'

export const Header = ({ className, children }: PropsWithChildren<WithClassName>) => {
  return <div className={cx('flex flex-col gap-1', className)}>{children}</div>
}
