import { type QueryClient } from '@tanstack/react-query'
import { type LoaderFunction } from 'react-router-dom'
import type React from 'react'

declare global {
  type QueryClientLoaderFn = (client: QueryClient) => LoaderFunction
}

declare module 'react' {
  function forwardRef<T, P = Record<string, never>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}
