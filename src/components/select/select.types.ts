import type { FocusEventHandler, ReactNode } from 'react'

export type SelectFieldProps = {
  id?: string
  placeholder?: ReactNode
  value?: string
  selected?: ReactNode
  onChange?: (value: string) => void
  onBlur?: FocusEventHandler<HTMLButtonElement>
}
