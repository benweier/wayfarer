import { AppIcon } from '@/components/icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { RefAttributes } from 'react'
import { ItemIcon } from './dropdown-item-icon.component'

export const RadioItem = ({
  ref,
  children,
  ...props
}: DropdownMenu.DropdownMenuRadioItemProps & RefAttributes<HTMLDivElement>) => {
  return (
    <DropdownMenu.RadioItem
      ref={ref}
      {...props}
      className="group typography-sm relative flex select-none items-center rounded-sm py-2 pr-16 pl-8 text-foreground-secondary data-[disabled]:pointer-events-none data-[highlighted]:bg-background-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:text-foreground-primary data-[highlighted]:outline-none"
    >
      <DropdownMenu.ItemIndicator asChild>
        <ItemIcon>
          <AppIcon id="dot" aria-hidden="true" className="size-4 text-foreground-success-primary" />
        </ItemIcon>
      </DropdownMenu.ItemIndicator>

      {children}
    </DropdownMenu.RadioItem>
  )
}
