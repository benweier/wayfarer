/// <reference types="vite/client" />
import type { TFunction } from 'i18next'

declare global {
  type WithClassName = { className?: string }

  type Keys<T> = keyof T
  type Values<T> = T[keyof T]

  type MetaObject =
    | {
        title: string
      }
    | { name: string; content: string }
    | { property: string; content: string }

  type MetaFunction<T extends Record<string, unknown> = unknown> = (t: TFunction, args?: Partial<T>) => MetaObject[]
}

declare module 'react' {
  /* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }
}
