import { Path } from 'history'
import { useLocation as useRouterLocation } from 'react-router'

type LocationState = unknown

interface Location<T = LocationState> extends Path {
  state?: T
}

interface UseLocation {
  <T extends LocationState>(): Location<Partial<T>>
}

export const useLocation = useRouterLocation as UseLocation
