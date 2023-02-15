import { QueryClient } from '@tanstack/react-query'

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
})
