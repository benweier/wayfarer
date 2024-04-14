import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { AppIcon } from '@/components/icons'

export const CheckboxItem = ({ children, ...props }: DropdownMenu.DropdownMenuCheckboxItemProps) => {
  return (
    <DropdownMenu.CheckboxItem
      className="group text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:bg-background-tertiary data-[highlighted]:text-foreground-primary typography-sm relative flex items-center rounded-md py-2 pr-16 pl-8 outline-none select-none data-[disabled]:pointer-events-none"
      {...props}
    >
      <DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <AppIcon id="check" aria-hidden="true" className="text-foreground-success-primary size-4" />
      </DropdownMenu.ItemIndicator>

      {children}
    </DropdownMenu.CheckboxItem>
  )
}
