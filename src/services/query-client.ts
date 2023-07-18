import { QueryClient } from '@tanstack/react-query'

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 60_000,
      cacheTime: 60_000,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      retry: false,
    },
  },
})
