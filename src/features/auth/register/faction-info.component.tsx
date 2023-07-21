import { useQuery } from '@tanstack/react-query'
import { useFormContext, useWatch } from 'react-hook-form'
import { Badge } from '@/components/badge'
import { getFactionsList } from '@/services/api/spacetraders/factions'
import { type FactionResponse } from '@/types/spacetraders'
import { type RegisterSchema } from './register.validation'

export const FactionInfo = () => {
  const { control } = useFormContext<RegisterSchema>()
  const faction = useWatch({ control, name: 'faction' })
  const { isSuccess, data } = useQuery({
    queryKey: ['factions'],
    queryFn: ({ signal }) => getFactionsList(undefined, { signal }),
    select: (response) => {
      const factions = new Map<string, FactionResponse>()
      response.data.forEach((faction) => factions.set(faction.symbol, faction))
      return { factions }
    },
  })

  if (!isSuccess) return null

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
