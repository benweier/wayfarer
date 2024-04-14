import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { type ForwardedRef, forwardRef } from 'react'
import { AppIcon } from '@/components/icons'

const CheckboxItemComponent = (
  { children, ...props }: DropdownMenu.DropdownMenuCheckboxItemProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  return (
    <DropdownMenu.CheckboxItem
      ref={ref}
      {...props}
      className="group text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:bg-background-secondary data-[highlighted]:text-foreground-primary typography-sm relative flex items-center rounded-sm py-2 pr-16 pl-8 select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
    >
      <DropdownMenu.ItemIndicator className="absolute inset-y-0 left-1 inline-flex w-6 items-center justify-center">
        <AppIcon id="check" aria-hidden="true" className="text-foreground-success-primary size-4" />
      </DropdownMenu.ItemIndicator>

      {children}
    </DropdownMenu.CheckboxItem>
  )
}

export const CheckboxItem = forwardRef(CheckboxItemComponent)
