export const groupByFn = <T, K extends keyof any>(arr: T[] = [], getKey: (item: T) => K) =>
  arr.reduce((obj, item) => {
    const group = getKey(item)

    if (!obj[group]) obj[group] = []

    obj[group].push(item)

    return obj
  }, {} as Record<K, T[]>)
