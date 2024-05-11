export const reduceArrayToMap = <T extends Record<string, any>>(
  arr: T[] = [],
  key: keyof T = '',
  initial = new Map(),
) => {
  return arr.reduce<Map<string, T>>((result, item) => {
    result.set(item[key], item)

    return result
  }, initial)
}
