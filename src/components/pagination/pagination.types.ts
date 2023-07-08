export type PaginationProps = {
  current: number
  total: number
  length?: 3 | 5 | 7
  onChange: (page: number) => void
}
