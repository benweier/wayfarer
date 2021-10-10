import { createApi } from '@reduxjs/toolkit/query/react'
import type {
  AccountResponse,
  AvailableLoanResponse,
  AvailableShipResponse,
  LeaderboardResponse,
  Loan,
  LoanType,
  MarketplaceResponse,
  SystemsResponse,
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
    leaderboard: builder.query<LeaderboardResponse, void>({
      query: () => `/game/leaderboard/net-worth`,
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
      query: () => `/my/ships`,
    }),
    shipListings: builder.query<AvailableShipResponse, { class?: string; system: string }>({
      query: (args) => ({ url: `/systems/${args.system}/ship-listings`, method: 'GET', params: { class: args.class } }),
    }),
    purchaseShip: builder.mutation<{ credits: number; ship: YourShip }, { location: string; type: string }>({
      invalidatesTags: ['ships'],
      query: (args) => ({ url: `/my/ships`, method: 'POST', body: { location: args.location, type: args.type } }),
    }),
    availableSystems: builder.query<SystemsResponse, void>({
      query: () => ({ url: `/game/systems`, method: 'GET' }),
    }),
    marketplace: builder.query<MarketplaceResponse, { location: string }>({
      query: (args) => ({ url: `/locations/${args.location}/marketplace`, method: 'GET' }),
    }),
  }),
})

export const {
  useAvailableLoansQuery,
  useAvailableSystemsQuery,
  useClaimUserMutation,
  useLazyAvailableLoansQuery,
  useLazyAvailableSystemsQuery,
  useLazyLeaderboardQuery,
  useLazyMarketplaceQuery,
  useLazyMyAccountQuery,
  useLazyMyLoansQuery,
  useLazyMyShipsQuery,
  useLazyShipListingsQuery,
  useLazyStatusQuery,
  useLeaderboardQuery,
  useMarketplaceQuery,
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
