import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store/types'

export const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.SPACETRADERS_API_URL })

export const baseQueryWithTokenParam: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const token = (api.getState() as RootState).auth.token

  return await baseQuery(
    typeof args === 'string'
      ? { url: args, params: { token: token ?? undefined } }
      : { ...args, params: { token: token ?? undefined } },
    api,
    extraOptions,
  )
}
