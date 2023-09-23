import { type Draft, produce } from 'immer'
import { create } from 'zustand'
import { type CooldownResponse } from '@/types/spacetraders'

type ShipCooldownState = { cooldowns: Map<string, CooldownResponse> }

type ShipCooldownHandlers = {
  setCooldown: (shipSymbol: string, cooldown: CooldownResponse) => void
  updateRemainingSeconds: (shipSymbol: string) => void
  clearCooldown: (shipSymbol: string) => void
}

type ShipCooldownStore = ShipCooldownState & ShipCooldownHandlers

export const useShipCooldownStore = create<ShipCooldownStore>((set, get) => ({
  cooldowns: new Map(),
  setCooldown: (shipSymbol, cooldown) => {
    set(
      produce((draft: Draft<ShipCooldownStore>) => {
        draft.cooldowns = new Map(get().cooldowns).set(shipSymbol, cooldown)
      }),
    )
  },
  updateRemainingSeconds: (shipSymbol) => {
    set(
      produce((draft: Draft<ShipCooldownStore>) => {
        const cooldown = get().cooldowns.get(shipSymbol)

        if (cooldown) {
          const now = Date.now()
          const expiration = new Date(cooldown.expiration)
          const remainingSeconds = Math.floor(Math.abs(now - expiration.getTime()) / 1000)

          draft.cooldowns = new Map(get().cooldowns).set(shipSymbol, { ...cooldown, remainingSeconds })
        }
      }),
    )
  },
  clearCooldown: (shipSymbol) => {
    set(
      produce((draft: Draft<ShipCooldownStore>) => {
        draft.cooldowns.delete(shipSymbol)
      }),
    )
  },
}))
