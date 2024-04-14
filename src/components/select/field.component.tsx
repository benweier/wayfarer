import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Select from '@radix-ui/react-select'
import { type PropsWithChildren } from 'react'
import { AppIcon } from '@/components/icons'
import { type SelectFieldProps } from './select.types'

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
          <AppIcon id="chevron:up-down" className="text-fg-tertiary size-4" aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="bg-background-primary border-border-primary z-50 overflow-hidden rounded-md border"
          sideOffset={8}
        >
          <ScrollArea.Root className="h-full max-h-[320px] overflow-hidden" type="scroll">
            <ScrollArea.Viewport className="h-full max-h-[320px] p-2">
              <Select.Viewport>{children}</Select.Viewport>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className="bg-background-secondary flex touch-none rounded-tr-md rounded-br-md p-0.5 transition-colors duration-100 ease-out select-none data-[orientation=vertical]:w-3"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="bg-background-tertiary relative flex-1 rounded-full" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
