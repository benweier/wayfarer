export const groupBy = <T, K extends keyof T>(arr: T[], key: K | ((item: T) => K)) =>
  arr.reduce<Record<K, T[]>>(
    (obj, item) => {
      const group = typeof key === 'function' ? key(item) : key

      if (!obj[group]) obj[group] = []

      obj[group].push(item)

      return obj
    },
    {} as Record<K, T[]>,
  )
