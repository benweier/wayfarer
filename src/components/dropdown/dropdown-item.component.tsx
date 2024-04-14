import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { type ForwardedRef, forwardRef } from 'react'

const DropdownItem = (
  { children, ...props }: DropdownMenu.DropdownMenuItemProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  return (
    <DropdownMenu.Item
      ref={ref}
      {...props}
      className="group text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:bg-background-tertiary data-[highlighted]:text-foreground-primary typography-sm relative flex flex items-center items-center gap-2 rounded-md py-2 pr-16 pl-8 outline-none select-none data-[disabled]:pointer-events-none"
    >
      {children}
    </DropdownMenu.Item>
  )
}

export const Item = forwardRef(DropdownItem)
