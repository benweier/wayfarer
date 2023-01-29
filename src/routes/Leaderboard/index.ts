import { lazy } from '@/utilities/lazy'

export { loader } from './loader'

export const { Layout } = lazy(() => import('./Layout'), 'Layout')
export const { Screen } = lazy(() => import('./Screen'), 'Screen')
