export type PaginationProps = {
  current: number
  min: number
  max: number
  length?: 3 | 5 | 7
  onChange: (page: number) => void
}
