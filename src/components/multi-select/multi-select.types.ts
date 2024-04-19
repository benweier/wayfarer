import type { FocusEventHandler, ReactNode } from 'react'

export type MultiSelectFieldProps = {
  id?: string
  placeholder?: ReactNode
  value?: string[]
  onChange?: (value: string[]) => void
  onBlur?: FocusEventHandler<HTMLButtonElement>
  trigger: ReactNode
}
