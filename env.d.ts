/// <reference types="vite/client" />
import { type TFunction } from 'i18next'
import type React from 'react'

declare global {
  type MetaObject =
    | {
        title: string
      }
    | { name: string; content: string }
    | { property: string; content: string }

  type MetaFunction<T extends Record<string, unknown> = unknown> = (t: TFunction, args: T) => MetaObject[]
}

declare module 'react' {
  function forwardRef<T, P = Record<string, never>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}
