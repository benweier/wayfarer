export type IsFunction<T> = T extends (...args: any[]) => any ? T : never

export const isFunction = <T>(value: T): value is IsFunction<T> => typeof value === 'function'
