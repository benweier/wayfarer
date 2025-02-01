import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { twm } from '@/utilities/twm.helper'
import type { RefAttributes } from 'react'

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
      className={twm(
        'group text-sm relative flex select-none items-center gap-2 rounded-md py-2 pr-16 pl-8 text-foreground-secondary outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-background-tertiary data-[disabled]:text-foreground-disabled data-[highlighted]:text-foreground-primary',
        'data-[variant="danger"]:data-highlighted:bg-background-error-primary/12 data-[variant="danger"]:data-highlighted:text-foreground-error-primary/24',
      )}
    >
      {children}
    </DropdownMenu.Item>
  )
}
