import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Item = ({ children, ...props }: DropdownMenu.DropdownMenuItemProps) => {
  return (
    <DropdownMenu.Item
      {...props}
      className="group text-foreground-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:bg-background-tertiary data-[highlighted]:text-foreground-primary typography-sm relative flex items-center rounded-md py-2 pr-16 pl-8 outline-none select-none data-[disabled]:pointer-events-none"
    >
      {children}
    </DropdownMenu.Item>
  )
}
