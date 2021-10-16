import { Location } from 'types/spacetraders'

type LocationSelectOptions =
  | {
      system: System
      locations: Location[]
      selected?: Location
      isLoading: false
      onChange: (location?: Location) => void
    }
  | {
      system: undefined
      locations: []
      selected: undefined
      isLoading: true
      onChange: (location?: Location) => void
    }
