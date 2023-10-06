export const getPageList = (length: number, skip = 0) => {
  return Array.from({ length })
    .map((_, i) => i + 1)
    .slice(skip)
}
