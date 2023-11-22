/// <reference types="vite/client" />
import { type QueryClient } from '@tanstack/react-query'
import { type TFunction } from 'i18next'
import { type LoaderFunction } from 'react-router-dom'
import type React from 'react'

declare global {
  type QueryClientLoaderFn = (client: QueryClient) => LoaderFunction
  type MetaObject =
    | {
        title: string
      }
    | { name: string; content: string }

  type MetaFunction<T = unknown> = (t: TFunction, args: T) => MetaObject[]
}

declare module 'react' {
  function forwardRef<T, P = Record<string, never>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}
