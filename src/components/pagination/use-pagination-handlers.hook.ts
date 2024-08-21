export const usePaginationHandlers = (
  { current, min, max }: { current: number; min: number; max: number },
  onChange: (page: number) => void,
) => {
  const firstPage = () => {
    if (current > min) onChange(min)
  }
  const prevPage = () => {
    if (current > min) onChange(current - 1)
  }
  const nextPage = () => {
    if (current < max) onChange(current + 1)
  }
  const lastPage = () => {
    if (current < max) onChange(max)
  }
  const goto = (page: number) => () => {
    onChange(page)
  }

  return {
    firstPage,
    prevPage,
    goto,
    nextPage,
    lastPage,
  }
}
