export const reduceArrayToMap = <T extends Record<string, any>>(
  arr: T[] = [],
  key: keyof T = 'id',
  initial: Map<string, T> = new Map(),
) => {
  return arr.reduce<Map<string, T>>((result, item) => {
    if (key in item) {
      result.set(item[key], item)
    }

    return result
  }, initial)
}
