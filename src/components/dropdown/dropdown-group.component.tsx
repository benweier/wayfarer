import { AppIcon } from '@/components/icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { PropsWithChildren, ReactNode } from 'react'

export const Group = ({ trigger, children }: PropsWithChildren<{ trigger: ReactNode }>) => {
  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className="group text-foreground-secondary data-[state=open]:bg-background-secondary data-[state=open]:text-foreground-primary data-[disabled]:text-foreground-disabled data-[highlighted]:bg-background-tertiary data-[highlighted]:text-foreground-primary data-[highlighted]:data-[state=open]:bg-background-tertiary data-[highlighted]:data-[state=open]:text-foreground-primary typography-sm relative flex items-center rounded-md p-2 pl-6 outline-none select-none data-[disabled]:pointer-events-none">
        {trigger}

        <div className="text-foreground-success-primary group-data-[disabled]:text-foreground-disabled group-data-[highlighted]:text-foreground-success-secondary ml-auto pl-[20px]">
          <AppIcon id="chevron:right" aria-hidden="true" className="size-4" />
        </div>
      </DropdownMenu.SubTrigger>

      <DropdownMenu.Portal>
        <DropdownMenu.SubContent
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={2}
          alignOffset={-5}
        >
          {children}
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  )
}
