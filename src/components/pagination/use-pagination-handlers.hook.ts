export const usePaginationHandlers = (
  { current, min, max }: { current: number; min: number; max: number },
  onChange: (page: number) => void,
) => {
  const firstPage = () => {
    if (current > min) onChange(min)
  }
  const prevPage = () => {
    if (current > min) {
      if (current > max) {
        onChange(max)
      } else {
        onChange(current - 1)
      }
    }
  }
  const nextPage = () => {
    if (current < max) {
      if (current < min) {
        onChange(min)
      } else {
        onChange(current + 1)
      }
    }
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
