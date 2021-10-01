import { System } from 'types/spacetraders'

type SystemSelectOptions =
  | {
      systems: System[]
      selected?: System
      isLoading: false
      onChange: (system?: System) => void
    }
  | {
      systems: []
      selected: undefined
      isLoading: true
      onChange: (system?: System) => void
    }
