import type { DialogTitleProps } from '@radix-ui/react-dialog'
import { cx } from 'class-variance-authority'
import { Drawer } from 'vaul'

export const Title = ({ className, children, ...props }: DialogTitleProps) => {
  return (
    <Drawer.Title {...props} className={cx('display-xs font-semibold', className)}>
      {children}
    </Drawer.Title>
  )
}
