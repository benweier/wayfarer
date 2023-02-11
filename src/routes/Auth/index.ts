import { lazy } from '@/utilities/lazy'

export const { Layout } = lazy(() => import('./Layout'), ['Layout'])
export const { Login, Register } = lazy(() => import('@/components/Auth'), ['Login', 'Register'])
export { Required } from '@/components/Auth'
