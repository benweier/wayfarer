import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { PropsWithChildren, ReactNode } from 'react'

export const Field = ({ trigger, children }: PropsWithChildren<{ trigger: ReactNode }>) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="popover relative z-50 space-y-1 rounded-md border border-border-primary bg-background-primary p-2"
          sideOffset={8}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
