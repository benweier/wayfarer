import { Path, useLocation as useRouterLocation } from 'react-router-dom'

type LocationState = unknown
type Key = string

export interface Location<T = LocationState> extends Path {
  state?: T
  key: Key
}

interface UseLocation {
  <T extends LocationState>(): Location<Partial<T>>
}

export const useLocation = useRouterLocation as UseLocation
