export type SelectOption = { id: string; name: string | JSX.Element }

export type SelectProps<T> = {
  label: string
  data: T[]
  selected?: T
  loading?: JSX.Element
  onChange: (value?: T) => void
  getOption: (item: T, index: number, source: T[]) => SelectOption
  getItemKey: (value?: T) => string | number | undefined
}
