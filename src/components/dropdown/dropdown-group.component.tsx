import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { AppIcon } from '@/components/icons'
import type { PropsWithChildren, ReactNode } from 'react'

export const Group = ({ trigger, children }: PropsWithChildren<{ trigger: ReactNode }>) => {
  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className="group text-sm relative flex select-none items-center rounded-md p-2 pl-6 text-foreground-secondary outline-none data-[highlighted]:data-[state=open]:bg-background-tertiary data-[highlighted]:data-[state=open]:text-foreground-primary data-[disabled]:pointer-events-none data-[highlighted]:bg-background-tertiary data-[state=open]:bg-background-secondary data-[disabled]:text-foreground-disabled data-[highlighted]:text-foreground-primary data-[state=open]:text-foreground-primary">
        {trigger}

        <div className="ml-auto pl-[20px] text-foreground-success-primary group-data-[disabled]:text-foreground-disabled group-data-[highlighted]:text-foreground-success-secondary">
          <AppIcon id="chevron:right" aria-hidden="true" className="size-4" />
        </div>
      </DropdownMenu.SubTrigger>

      <DropdownMenu.Portal>
        <DropdownMenu.SubContent
          className="min-w-[220px] rounded-md bg-white p-1 will-change-[opacity,transform]"
          sideOffset={2}
          alignOffset={-5}
        >
          {children}
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  )
}
