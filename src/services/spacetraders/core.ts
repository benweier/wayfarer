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
  tagTypes: ['account', 'loans', 'ships'],
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
    myLoans: builder.query<{ loans: YourLoan[] }, void>({
      providesTags: ['loans'],
      query: () => `/my/loans`,
    }),
    availableLoans: builder.query<AvailableLoanResponse, void>({
      query: () => `/types/loans`,
    }),
    takeOutLoan: builder.mutation<{ credits: number; loan: Loan }, { type: LoanType }>({
      invalidatesTags: ['loans'],
      query: (args) => ({ url: `/my/loans`, method: 'POST', body: { type: args.type } }),
    }),
    payLoan: builder.mutation<{ credits: number; loan: Loan }, { id: string }>({
      invalidatesTags: ['loans'],
      query: (args) => ({ url: `/my/loans/${args.id}`, method: 'PUT' }),
    }),
    myShips: builder.query<{ ships: YourShip[] }, void>({
      providesTags: ['ships'],
      query: () => `/my/shipd`,
    }),
    shipListings: builder.query<AvailableShipResponse, { class: string; system: string }>({
      query: (args) => ({ url: `/systems/${args.system}/ship-listings`, method: 'GET', params: { class: args.class } }),
    }),
    purchaseShip: builder.mutation<{ credits: number; ship: YourShip }, { location: string; type: string }>({
      invalidatesTags: ['ships'],
      query: (args) => ({ url: `/my/ships`, method: 'POST', body: { location: args.location, type: args.type } }),
    }),
  }),
})

export const {
  useAvailableLoansQuery,
  useClaimUserMutation,
  useLazyAvailableLoansQuery,
  useLazyMyAccountQuery,
  useLazyMyLoansQuery,
  useLazyMyShipsQuery,
  useLazyShipListingsQuery,
  useLazyStatusQuery,
  useMyAccountQuery,
  useMyLoansQuery,
  useMyShipsQuery,
  usePayLoanMutation,
  usePrefetch,
  usePurchaseShipMutation,
  useShipListingsQuery,
  useStatusQuery,
  useTakeOutLoanMutation,
} = spacetradersAPI
