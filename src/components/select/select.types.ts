import { Key, ReactNode } from 'react'

export type SelectFieldProps<T = string> = {
  label?: ReactNode
  selected?: T
  by?: (keyof T & string) | ((a: T, z: T) => boolean)
  options: T[]
  onChange?: (value?: T | null) => void
  getItemKey: (item: T) => Key | null | undefined
  getItemLabel: (item?: T) => ReactNode | JSX.Element
  getItemOption: (item: T) => ReactNode | JSX.Element
  getItemDisabled?: (item: T) => boolean | undefined
}
