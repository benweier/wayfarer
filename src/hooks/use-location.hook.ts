import { useLocation as useRouterLocation } from 'react-router-dom'
import { type Path } from 'react-router-dom'

type LocationState = unknown
type Key = string

export type Location<T = LocationState> = Path & {
  state?: T
  key: Key
}

type UseLocation = <T extends LocationState>() => Location<Partial<T>>

export const useLocation = useRouterLocation as UseLocation
