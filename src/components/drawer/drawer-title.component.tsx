import { Drawer } from 'vaul'
import { cx } from '@/utilities/cx.helper'
import type { DialogTitleProps } from '@radix-ui/react-dialog'

export const Title = ({ className, children, ...props }: DialogTitleProps) => {
  return (
    <Drawer.Title {...props} className={cx('text-h5 font-semibold', className)}>
      {children}
    </Drawer.Title>
  )
}
