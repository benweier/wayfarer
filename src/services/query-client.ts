import { QueryClient } from '@tanstack/react-query'

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 60_000,
      refetchOnWindowFocus: false,
      throwOnError: true,
      retry: false,
    },
  },
})
