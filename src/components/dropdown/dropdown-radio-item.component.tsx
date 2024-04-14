import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { AppIcon } from '@/components/icons'

export const RadioItem = ({ children, ...props }: DropdownMenu.DropdownMenuRadioItemProps) => {
  return (
    <DropdownMenu.RadioItem
      {...props}
      className="group text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:bg-background-secondary data-[highlighted]:text-foreground-primary typography-sm relative flex items-center rounded-sm py-2 pr-16 pl-8 select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
    >
      <DropdownMenu.ItemIndicator className="absolute inset-y-0 left-1 inline-flex w-6 items-center justify-center">
        <AppIcon id="dot" aria-hidden="true" className="text-foreground-success-primary size-4" />
      </DropdownMenu.ItemIndicator>

      {children}
    </DropdownMenu.RadioItem>
  )
}
