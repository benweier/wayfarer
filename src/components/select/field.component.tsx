import * as Select from '@radix-ui/react-select'
import { type PropsWithChildren } from 'react'
import { AppIcon } from '@/components/icons'
import { type SelectFieldProps } from './select.types'

export const Field = ({
  id,
  value,
  placeholder,
  selected,
  onChange,
  onBlur,
  children,
}: PropsWithChildren<SelectFieldProps>) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger id={id} className="select" onBlur={onBlur}>
        <Select.Value placeholder={placeholder}>{selected}</Select.Value>
        <Select.Icon className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <AppIcon id="chevron:up-down" className="text-fg-tertiary size-4" aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-background-primary border-border-primary overflow-hidden rounded-md border">
          <Select.ScrollUpButton className="text-foreground-secondary bg-background-secondary mb-2 flex cursor-default items-center justify-center py-1">
            <AppIcon id="chevron:up" className="text-foreground-tertiary size-3" aria-hidden="true" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-2">{children}</Select.Viewport>

          <Select.ScrollDownButton className="text-foreground-secondary bg-background-secondary mt-2 flex cursor-default items-center justify-center py-1">
            <AppIcon id="chevron:down" className="text-fg-tertiary size-3" aria-hidden="true" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
