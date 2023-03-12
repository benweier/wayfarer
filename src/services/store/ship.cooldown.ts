import { produce } from 'immer'
import { create } from 'zustand'
import { CooldownResponse } from '@/types/spacetraders'

type ShipCooldownState = { ships: Record<string, { cooldown: CooldownResponse } | undefined> }

type ShipCooldownHandlers = {
  setCooldown: (shipID: string, cooldown: CooldownResponse) => void
  updateRemainingSeconds: (shipID: string) => void
  clearCooldown: (shipID: string) => void
}

type ShipCooldownStore = ShipCooldownState & ShipCooldownHandlers

export const useShipCooldownStore = create<ShipCooldownStore>((set, get) => ({
  ships: {},
  setCooldown: (shipID, cooldown) => {
    return set(
      produce((draft) => {
        draft.ships[shipID] = { cooldown }
      }),
    )
  },
  updateRemainingSeconds: (shipID) => {
    return set(
      produce((draft) => {
        const ship = get().ships[shipID]

        if (ship?.cooldown) {
          const now = Date.now()
          const expiration = new Date(ship.cooldown.expiration)

          draft.ships[shipID].cooldown.remainingSeconds = Math.floor(Math.abs(now - expiration.getTime()) / 1000)
        }
      }),
    )
  },
  clearCooldown: (shipID) => {
    return set(
      produce((draft) => {
        draft.ships[shipID] = undefined
      }),
    )
  },
}))
