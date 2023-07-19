import { Draft, produce } from 'immer'
import { create } from 'zustand'
import { CooldownResponse } from '@/types/spacetraders'

type ShipCooldownState = { cooldowns: { [key: string]: CooldownResponse } }

type ShipCooldownHandlers = {
  setCooldown: (shipSymbol: string, cooldown: CooldownResponse) => void
  updateRemainingSeconds: (shipSymbol: string) => void
  clearCooldown: (shipSymbol: string) => void
}

type ShipCooldownStore = ShipCooldownState & ShipCooldownHandlers

export const useShipCooldownStore = create<ShipCooldownStore>((set, get) => ({
  cooldowns: {},
  setCooldown: (shipSymbol, cooldown) => {
    return set(
      produce((draft: Draft<ShipCooldownStore>) => {
        draft.cooldowns[shipSymbol] = cooldown
      }),
    )
  },
  updateRemainingSeconds: (shipSymbol) => {
    return set(
      produce((draft: Draft<ShipCooldownStore>) => {
        const cooldown = get().cooldowns[shipSymbol]

        if (cooldown) {
          const now = Date.now()
          const expiration = new Date(cooldown.expiration)

          draft.cooldowns[shipSymbol].remainingSeconds = Math.floor(Math.abs(now - expiration.getTime()) / 1000)
        }
      }),
    )
  },
  clearCooldown: (shipSymbol) => {
    return set(
      produce((draft: Draft<ShipCooldownStore>) => {
        delete draft.cooldowns[shipSymbol]
      }),
    )
  },
}))
