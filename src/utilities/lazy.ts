import * as React from 'react'

// https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazy<T extends React.ComponentType<any>, I extends { [K in N]: T }, N extends keyof I>(
  factory: () => Promise<I>,
  name: N,
): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  })
}
