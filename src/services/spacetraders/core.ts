import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithTokenParam } from './base-query'
import type {
  AccountResponse,
  AvailableGoodsResponse,
  AvailableLoansResponse,
  AvailableShipsResponse,
  Good,
  LeaderboardResponse,
  Loan,
  LoanType,
  LocationResponse,
  MarketplaceResponse,
  Order,
  SystemsResponse,
  TokenResponse,
  YourLoan,
  YourShip,
} from '@/types/spacetraders.d'

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
    availableLoans: builder.query<AvailableLoansResponse, void>({
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
    shipListings: builder.query<AvailableShipsResponse, { class?: string; system: string }>({
      query: (args) => ({ url: `/systems/${args.system}/ship-listings`, method: 'GET', params: { class: args.class } }),
    }),
    purchaseShip: builder.mutation<{ credits: number; ship: YourShip }, { location: string; type: string }>({
      invalidatesTags: ['ships'],
      query: (args) => ({ url: `/my/ships`, method: 'POST', body: { location: args.location, type: args.type } }),
    }),
    availableGoods: builder.query<AvailableGoodsResponse, void>({
      query: () => ({ url: `/types/goods`, method: 'GET' }),
    }),
    purchaseGoods: builder.mutation<{ credits: number; order: Order; ship: YourShip }, { ship: string; good: Good }>({
      query: (args) => ({ url: `/my/purchase-orders`, method: 'POST', body: { shipId: args.ship, good: args.good } }),
    }),
    availableSystems: builder.query<SystemsResponse, void>({
      query: () => ({ url: `/game/systems`, method: 'GET' }),
    }),
    marketplace: builder.query<MarketplaceResponse, { location: string }>({
      query: (args) => ({ url: `/locations/${args.location}/marketplace`, method: 'GET' }),
    }),
    location: builder.query<LocationResponse, { location: string }>({
      query: (args) => ({ url: `/locations/${args.location}`, method: 'GET' }),
    }),
  }),
})

export const {
  useAvailableGoodsQuery,
  useAvailableLoansQuery,
  useAvailableSystemsQuery,
  useClaimUserMutation,
  useLazyAvailableGoodsQuery,
  useLazyAvailableLoansQuery,
  useLazyAvailableSystemsQuery,
  useLazyLeaderboardQuery,
  useLazyLocationQuery,
  useLazyMarketplaceQuery,
  useLazyMyAccountQuery,
  useLazyMyLoansQuery,
  useLazyMyShipsQuery,
  useLazyShipListingsQuery,
  useLazyStatusQuery,
  useLeaderboardQuery,
  useLocationQuery,
  useMarketplaceQuery,
  useMyAccountQuery,
  useMyLoansQuery,
  useMyShipsQuery,
  usePayLoanMutation,
  usePrefetch,
  usePurchaseGoodsMutation,
  usePurchaseShipMutation,
  useShipListingsQuery,
  useStatusQuery,
  useTakeOutLoanMutation,
} = spacetradersAPI
