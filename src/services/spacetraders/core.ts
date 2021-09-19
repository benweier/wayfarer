import { createApi } from '@reduxjs/toolkit/query/react'
import type {
  AccountResponse,
  AvailableLoanResponse,
  AvailableShipResponse,
  Loan,
  LoanType,
  TokenResponse,
  YourLoan,
  YourShip,
} from 'types/spacetraders.d'
import { baseQueryWithTokenParam } from './base-query'

export const spacetradersAPI = createApi({
  reducerPath: 'spacetradersAPI',
  tagTypes: ['account'],
  baseQuery: baseQueryWithTokenParam,
  endpoints: (builder) => ({
    status: builder.query<{ status: boolean }, void>({
      query: () => `/game/status`,
      transformResponse: (response: { status: string }) => {
        return { status: response.status === 'spacetraders is currently online and available to play' }
      },
    }),
    claimUser: builder.mutation<TokenResponse, { user: string }>({
      invalidatesTags: ['account'],
      query: (args) => ({ url: `/users/${args.user}/claim`, method: 'POST' }),
    }),
    myAccount: builder.query<AccountResponse, { token: string }>({
      providesTags: ['account'],
      query: (args) => ({
        url: `/my/account`,
        headers: { Authorization: args.token ? `Bearer ${args.token}` : undefined },
      }),
    }),
    takeOutLoan: builder.mutation<{ credits: number; loan: Loan }, { type: LoanType }>({
      query: (args) => ({ url: `/my/loans`, body: { type: args.type } }),
    }),
    purchaseShip: builder.mutation<{ credits: number; ship: YourShip }, { location: string; type: string }>({
      query: (args) => ({ url: `/my/ships`, body: { location: args.location, type: args.type } }),
    }),
    myLoans: builder.query<{ loans: YourLoan[] }, void>({
      query: () => `/my/loans`,
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
  useClaimUserMutation,
  useLazyAvailableLoansQuery,
  useLazyMyAccountQuery,
  useLazyShipListingsQuery,
  useLazyStatusQuery,
  useMyAccountQuery,
  usePrefetch,
  usePurchaseShipMutation,
  useShipListingsQuery,
  useStatusQuery,
  useTakeOutLoanMutation,
} = spacetradersAPI
