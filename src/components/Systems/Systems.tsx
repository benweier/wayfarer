import tw from 'twin.macro'
import { Caption } from '@/components/Caption'
import { useAvailableSystemsQuery } from '@/services/spacetraders/core'
import { Location, System } from '@/types/spacetraders'

const LocationList = ({ locations }: { locations: Location[] }) => {
  return (
    <div css={tw`grid grid-cols-4 gap-4 my-4`}>
      {locations.map((location) => (
        <div key={location.symbol}>
          <Caption>{location.symbol}</Caption>
          <div css={tw`text-2xl font-bold leading-none`}>{location.name}</div>
        </div>
      ))}
    </div>
  )
}

const SystemItem = ({ system }: { system: System }) => {
  return (
    <div>
      <div css={tw`text-gray-300 text-4xl leading-none font-bold`}>{system.symbol}</div>
      <div css={tw`text-base leading-tight font-medium uppercase`}>{system.name}</div>
      <LocationList locations={system.locations} />
    </div>
  )
}

const SystemList = () => {
  const { data } = useAvailableSystemsQuery()

  return (
    <>
      {!!data?.systems.length && (
        <div css={tw`grid grid-flow-row gap-16`}>
          {data.systems.map((system) => (
            <SystemItem key={system.symbol} system={system} />
          ))}
        </div>
      )}
    </>
  )
}

export const Systems = () => {
  return (
    <div>
      <SystemList />
    </div>
  )
}
