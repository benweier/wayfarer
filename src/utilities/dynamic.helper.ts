import { lazy } from 'react'
import type { ComponentType } from 'react'

// https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function dynamic<T extends ComponentType<any>, I extends Record<N, T>, N extends keyof I>(
  factory: () => Promise<I>,
  name: N,
): I {
  return Object.create({
    [name]: lazy(() => factory().then((mod) => ({ default: mod[name] }))),
  }) as I
}
