import { cx } from '@/utilities/cx.helper'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
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
        'group typography-sm relative flex select-none items-center gap-2 rounded-md py-2 pr-16 pl-8 text-foreground-secondary outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-background-tertiary data-[disabled]:text-foreground-disabled data-[highlighted]:text-foreground-primary',
      )}
    >
      {children}
    </DropdownMenu.Item>
  )
}
