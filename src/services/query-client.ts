import { QueryClient } from '@tanstack/react-query'

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600_000,
      gcTime: 600_000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})
