import { type ComponentType, type LazyExoticComponent, lazy } from 'react'

// https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function dynamic<T extends ComponentType<any>, I extends { [K in N]: T }, N extends keyof I>(
  factory: () => Promise<I>,
  name: N[],
): I {
  return Object.create(
    name.reduce<Record<string, LazyExoticComponent<I[N]>>>((obj, n) => {
      obj[n as string] = lazy(() => factory().then((module) => ({ default: module[n] })))

      return obj
    }, {}),
  )
}
