import { Path, State } from 'history'
import { useLocation as useRouterLocation } from 'react-router'

interface Location<T = any> extends Path {
  state?: T
}

interface UseLocation {
  <T extends State = null>(): Location<T | null>
}

export const useLocation = useRouterLocation as UseLocation
