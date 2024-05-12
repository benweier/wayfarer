export const getPagingRange = ({
  current,
  max,
  length,
}: {
  current: number
  max: number
  length: number
}): number[] => {
  const pages = Math.min(length, max)
  let start = current - Math.floor(pages / 2)

  start = Math.max(start, 1)
  start = Math.min(start, 1 + Math.max(max - pages, 0))

  return Array.from({ length: pages }, (_, i) => start + i)
}
