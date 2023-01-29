import { lazy } from '@/utilities/lazy'

export const { Layout } = lazy(() => import('./Dashboard'), 'Layout')
export const { Loans } = lazy(() => import('./Loans'), 'Loans')
export const { Marketplace } = lazy(() => import('./Marketplace'), 'Marketplace')
export const { Overview } = lazy(() => import('./Overview'), 'Overview')
export const { Ships } = lazy(() => import('./Ships'), 'Ships')
export const { Systems } = lazy(() => import('./Systems'), 'Systems')
