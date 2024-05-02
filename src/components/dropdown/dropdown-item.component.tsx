import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cx } from 'class-variance-authority'
import type { RefAttributes } from 'react'
import classes from './dropdown-item.module.css'

export const Item = ({
  ref,
  variant = 'default',
  children,
  ...props
}: DropdownMenu.DropdownMenuItemProps & { variant?: 'default' | 'danger' } & RefAttributes<HTMLDivElement>) => {
  return (
    <DropdownMenu.Item
      ref={ref}
      {...props}
      data-variant={variant}
      className={cx(
        classes['dropdown-item'],
        'group text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:bg-background-tertiary data-[highlighted]:text-foreground-primary typography-sm relative flex items-center gap-2 rounded-md py-2 pr-16 pl-8 outline-none select-none data-[disabled]:pointer-events-none',
      )}
    >
      {children}
    </DropdownMenu.Item>
  )
}
