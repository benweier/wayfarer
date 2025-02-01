import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Priority, useRegisterActions } from 'kbar'
import { useMemo } from 'react'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'
import type { Action } from 'kbar'

export const useFleetCommands = () => {
  const navigate = useNavigate()
  const { data } = useSuspenseQuery(getShipListQuery())
  const ships = data.data

  const actions = useMemo<Action[]>(() => {
    return [
      {
        id: 'ships',
        name: 'Ships',
        shortcut: ['Alt+KeyS'],
        priority: Priority.HIGH,
      },
      ...ships.map((ship) => {
        return {
          id: ship.symbol,
          name: ship.symbol,
          parent: 'ships',
          keywords: ship.symbol,
          perform: () => {
            void navigate({
              to: '/fleet/$shipSymbol',
              params: { shipSymbol: ship.symbol },
            })
          },
        }
      }),
    ]
  }, [navigate, ships])

  useRegisterActions(actions)
}
