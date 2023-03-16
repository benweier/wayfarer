import { atomWithStorage } from 'jotai/utils'

type CargoDisplayModeState = 'grid' | 'list'
type CargoDescriptionState = boolean

const CARGO_DISPLAY_MODE_STORAGE_KEY = 'cargo.display'
const CARGO_DESCRIPTION_STORAGE_KEY = 'cargo.description'

export const cargoDisplayAtom = atomWithStorage<CargoDisplayModeState>(CARGO_DISPLAY_MODE_STORAGE_KEY, 'grid')
export const cargoDescriptionAtom = atomWithStorage<CargoDescriptionState>(CARGO_DESCRIPTION_STORAGE_KEY, true)
