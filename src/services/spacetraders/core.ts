import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../store/types.d'
import type {
  AccountResponse,
  AvailableLoanResponse,
  AvailableShipResponse,
  Loan,
  LoanType,
  TokenResponse,
  YourShip,
} from '../../types/spacetraders.d'

export const spacetradersAPI = createApi({
  reducerPath: 'spacetradersAPI',
  tagTypes: ['Account'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spacetraders.io',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('authentication', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    claimUser: builder.mutation<TokenResponse, string>({
      invalidatesTags: ['Account'],
      query: (user) => ({ url: `/users/${user}/claim`, method: 'POST' }),
    }),
    myAccount: builder.query<AccountResponse, string>({
      providesTags: ['Account'],
      query: (token) => ({ url: `/my/account`, headers: { authorization: token ? `Bearer ${token}` : undefined } }),
    }),
    takeOutLoan: builder.mutation<{ credits: number; loan: Loan }, { type: LoanType }>({
      query: (args) => ({ url: `/my/loans`, body: { type: args.type } }),
    }),
    purchaseShip: builder.mutation<{ credits: number; ship: YourShip }, { location: string; type: string }>({
      query: (args) => ({ url: `/my/ships`, body: { location: args.location, type: args.type } }),
    }),
    availableLoans: builder.query<AvailableLoanResponse, void>({
      query: () => `/types/loans`,
    }),
    shipListings: builder.query<AvailableShipResponse, { class: string; system: string }>({
      query: (args) => ({ url: `/systems/${args.system}/ship-listings`, method: 'GET', params: { class: args.class } }),
    }),
  }),
})

export const {
  useAvailableLoansQuery,
  useLazyAvailableLoansQuery,
  useClaimUserMutation,
  useMyAccountQuery,
  useLazyMyAccountQuery,
  usePurchaseShipMutation,
  useShipListingsQuery,
  useLazyShipListingsQuery,
  useTakeOutLoanMutation,
} = spacetradersAPI
