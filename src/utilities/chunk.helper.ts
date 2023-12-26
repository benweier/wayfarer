/*
 * Split an array (T[]) into an array of arrays (T[][]) of size (N)
 */
export const chunk = <T>(arr: T[] = [], size = 1) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) => {
    return arr.slice(index * size, index * size + size)
  })
}
