import { Location, State } from 'history'
import { useLocation as useRouterLocation } from 'react-router'

interface UseLocation {
  <T extends State = null>(): Location<T | null>
}

export const useLocation = useRouterLocation as UseLocation
