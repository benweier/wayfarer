import { AppIcon } from '@/components/icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { RefAttributes } from 'react'
import { ItemIcon } from './dropdown-item-icon.component'

export const CheckboxItem = ({
  ref,
  children,
  ...props
}: DropdownMenu.DropdownMenuCheckboxItemProps & RefAttributes<HTMLDivElement>) => {
  return (
    <DropdownMenu.CheckboxItem
      ref={ref}
      {...props}
      className="group text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:bg-background-secondary data-[highlighted]:text-foreground-primary typography-sm relative flex items-center rounded-sm py-2 pr-16 pl-8 select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
    >
      <DropdownMenu.ItemIndicator asChild>
        <ItemIcon>
          <AppIcon id="check" aria-hidden="true" className="text-foreground-success-primary size-4" />
        </ItemIcon>
      </DropdownMenu.ItemIndicator>

      {children}
    </DropdownMenu.CheckboxItem>
  )
}
