import { lazy } from '@/utilities/lazy'

export const { Layout } = lazy(() => import('./Layout'), ['Layout'])
export const { Market } = lazy(() => import('./Market'), ['Market'])
export const { Overview } = lazy(() => import('./Overview'), ['Overview'])
export const Fleet = lazy(() => import('./Fleet'), ['List', 'Ship'])
export const Contracts = lazy(() => import('./Contracts'), ['List'])
export const Systems = lazy(() => import('./Systems'), ['List', 'View', 'Waypoint'])

export * as root from './dashboard.loader'
export * as market from './Market/market.loader'
export * as contracts from './Contracts/contracts.loader'
export * as systems from './Systems/systems.loader'
export * as fleet from './Fleet/fleet.loader'
export * as ship from './Fleet/ship.loader'
