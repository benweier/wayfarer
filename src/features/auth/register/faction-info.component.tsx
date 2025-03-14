import { useSuspenseQuery } from '@tanstack/react-query'
import { useFormContext, useWatch } from 'react-hook-form'
import { Badge } from '@/components/badge'
import { getFactionListQuery } from '@/services/api/spacetraders/factions'
import type { RegisterSchema } from './register.schema'
import type { FactionResponse } from '@/types/spacetraders'

export const FactionInfo = () => {
  const { control } = useFormContext<RegisterSchema>()
  const faction = useWatch({ control, name: 'faction' })
  const { data } = useSuspenseQuery({
    ...getFactionListQuery(),
    select: (response) => {
      const factions = new Map<string, FactionResponse>(response.data.map((faction) => [faction.symbol, faction]))

      return { factions }
    },
  })
  const info = data.factions.get(faction)

  if (!info) return null

  return (
    <div>
      <div className="text-sm">{info.description}</div>
      <div className="flex flex-wrap gap-1">
        {info.traits.map((trait) => (
          <Badge key={trait.symbol}>{trait.name}</Badge>
        ))}
      </div>
    </div>
  )
}
