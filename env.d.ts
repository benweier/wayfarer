/// <reference types="vite/client" />

/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { TFunction } from 'i18next'

declare global {
  interface WithClassName {
    className?: string
  }

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
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }
}
/* eslint-enable @typescript-eslint/consistent-indexed-object-style */
/* eslint-enable @typescript-eslint/consistent-type-definitions */
