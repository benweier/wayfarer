import { queryOptions } from '@tanstack/react-query'
import { api } from './api'
import { StatusResponseSchema } from './schema'

export function getStatusQuery() {
  return queryOptions({
    queryKey: [{ scope: 'status' }],
    queryFn: ({ signal }) => {
      return api('', {
        signal,
        schema: StatusResponseSchema,
      })
    },
  })
}
