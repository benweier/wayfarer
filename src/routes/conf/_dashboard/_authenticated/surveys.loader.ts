import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { type AuthStore } from '@/store/auth'
import { surveyStore } from '@/store/surveys'

export const loader: RouteLoaderFn<
  Record<string, never>,
  Record<string, never>,
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = () => {
  const { surveys } = surveyStore.getState()

  return {
    surveys,
  }
}
