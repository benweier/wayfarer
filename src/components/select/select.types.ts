import { type FocusEventHandler, type ReactNode } from 'react'

export type SelectFieldProps = {
  id?: string
  placeholder?: ReactNode
  value?: string
  selected?: ReactNode
  onChange?: (value: string) => void
  onBlur?: FocusEventHandler<HTMLButtonElement>
}
