export const getPagingRange = ({
  current,
  total,
  length,
}: {
  current: number
  total: number
  length: number
}): number[] => {
  const pages = Math.min(length, total)
  let start = current - Math.floor(pages / 2)

  start = Math.max(start, 1)
  start = Math.min(start, 1 + Math.max(total - pages, 0))

  return Array.from({ length: pages }, (_, i) => start + i)
}
