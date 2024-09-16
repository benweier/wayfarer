import { AppIcon } from '@/components/icons'
import * as ScrollArea from '@/components/scroll-area'
import * as Select from '@radix-ui/react-select'
import type { PropsWithChildren } from 'react'
import type { SelectFieldProps } from './select.types'

export const Field = ({
  id,
  value,
  placeholder = <>&nbsp;</>,
  selected,
  onChange,
  onBlur,
  children,
}: PropsWithChildren<SelectFieldProps>) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger id={id} className="select" onBlur={onBlur}>
        <Select.Value placeholder={<div className="text-foreground-tertiary italic">{placeholder}</div>}>
          {selected}
        </Select.Value>
        <Select.Icon className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <AppIcon id="chevron:up-down" className="size-4 text-fg-tertiary" aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="popover z-50 w-[var(--radix-select-trigger-width)] rounded-md border border-border-primary bg-background-primary"
        >
          <ScrollArea.Root height={320}>
            <Select.Viewport asChild>
              <ScrollArea.Viewport className="p-2">{children}</ScrollArea.Viewport>
            </Select.Viewport>

            <ScrollArea.Scrollbar orientation="vertical" />
          </ScrollArea.Root>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
