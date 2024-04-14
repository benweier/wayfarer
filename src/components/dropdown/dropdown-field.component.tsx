import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { type PropsWithChildren, type ReactNode } from 'react'

export const Field = ({ trigger, children }: PropsWithChildren<{ trigger: ReactNode }>) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="popover bg-background-primary border-border-primary relative z-50 rounded-md border p-2"
          sideOffset={8}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
