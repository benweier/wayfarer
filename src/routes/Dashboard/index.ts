import { lazy } from '@/utilities/lazy'
import { Layout } from './dashboard.layout.component'
import { loader } from './dashboard.loader'

export const Route = Object.assign(Layout, { loader })

export const { Market } = lazy(() => import('./Market'), ['Market'])
export const { Overview } = lazy(() => import('./Overview'), ['Overview'])
export const Contracts = lazy(() => import('./Contracts'), ['List', 'Contract'])
export const Systems = lazy(() => import('./Systems'), ['List', 'View', 'Waypoint'])

export * as root from './dashboard.loader'
export * as market from './Market/market.loader'
export * as contracts from './Contracts/contracts.loader'
export * as systems from './Systems/systems.loader'
