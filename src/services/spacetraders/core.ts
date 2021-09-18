import { createApi } from '@reduxjs/toolkit/query/react'
import type {
  AccountResponse,
  AvailableLoanResponse,
  AvailableShipResponse,
  Loan,
  LoanType,
  TokenResponse,
  YourShip,
} from 'types/spacetraders.d'
import { baseQueryWithTokenParam } from './base-query'

export const spacetradersAPI = createApi({
  reducerPath: 'spacetradersAPI',
  tagTypes: ['account'],
  baseQuery: baseQueryWithTokenParam,
  endpoints: (builder) => ({
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
