import { atomWithStorage } from 'jotai/utils'

type CargoDisplayModeState = 'grid' | 'list'

const CARGO_DISPLAY_MODE_STORAGE_KEY = 'cargo.display'

export const cargoDisplayAtom = atomWithStorage<CargoDisplayModeState>(CARGO_DISPLAY_MODE_STORAGE_KEY, 'grid')
