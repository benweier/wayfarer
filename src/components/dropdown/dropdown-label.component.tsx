import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Label = ({ children, ...props }: DropdownMenu.DropdownMenuLabelProps) => {
  return (
    <DropdownMenu.Label {...props} className="typography-sm px-2 py-2.5 pr-16 pl-8 text-foreground-tertiary uppercase">
      {children}
    </DropdownMenu.Label>
  )
}
