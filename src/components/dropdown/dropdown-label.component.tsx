import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Label = ({ children, ...props }: DropdownMenu.DropdownMenuLabelProps) => {
  return (
    <DropdownMenu.Label {...props} className="text-foreground-tertiary typography-sm py-2.5 px-2 pr-16 pl-8 uppercase">
      {children}
    </DropdownMenu.Label>
  )
}
