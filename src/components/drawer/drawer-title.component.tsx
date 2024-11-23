import { cx } from '@/utilities/cx.helper'
import type { DialogTitleProps } from '@radix-ui/react-dialog'
import { Drawer } from 'vaul'

export const Title = ({ className, children, ...props }: DialogTitleProps) => {
  return (
    <Drawer.Title {...props} className={cx('display-xs font-semibold', className)}>
      {children}
    </Drawer.Title>
  )
}
