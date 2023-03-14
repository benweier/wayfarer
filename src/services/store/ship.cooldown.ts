import { Draft, produce } from 'immer'
import { create } from 'zustand'
import { CooldownResponse } from '@/types/spacetraders'

type ShipCooldownState = { cooldowns: { [key: string]: CooldownResponse } }

type ShipCooldownHandlers = {
  setCooldown: (shipID: string, cooldown: CooldownResponse) => void
  updateRemainingSeconds: (shipID: string) => void
  clearCooldown: (shipID: string) => void
}

type ShipCooldownStore = ShipCooldownState & ShipCooldownHandlers

export const useShipCooldownStore = create<ShipCooldownStore>((set, get) => ({
  cooldowns: {},
  setCooldown: (shipID, cooldown) => {
    return set(
      produce((draft: Draft<ShipCooldownStore>) => {
        draft.cooldowns[shipID] = cooldown
      }),
    )
  },
  updateRemainingSeconds: (shipID) => {
    return set(
      produce((draft: Draft<ShipCooldownStore>) => {
        const cooldown = get().cooldowns[shipID]

        if (cooldown) {
          const now = Date.now()
          const expiration = new Date(cooldown.expiration)

          draft.cooldowns[shipID].remainingSeconds = Math.floor(Math.abs(now - expiration.getTime()) / 1000)
        }
      }),
    )
  },
  clearCooldown: (shipID) => {
    return set(
      produce((draft: Draft<ShipCooldownStore>) => {
        delete draft.cooldowns[shipID]
      }),
    )
  },
}))
