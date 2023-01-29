import { useQuery } from '@tanstack/react-query'
import * as api from '@/services/api/spacetraders'
import { Location, System } from '@/types/spacetraders'

const LocationList = ({ locations }: { locations: Location[] }) => {
  return (
    <div className="my-4 grid grid-cols-4 gap-4">
      {locations.map((location) => (
        <div key={location.symbol}>
          <div className="text-caption">{location.symbol}</div>
          <div className="text-2xl font-bold leading-none">{location.name}</div>
        </div>
      ))}
    </div>
  )
}

const SystemItem = ({ system }: { system: System }) => {
  return (
    <div>
      <div className="text-4xl font-bold leading-none text-gray-300">{system.symbol}</div>
      <div className="text-base font-medium uppercase leading-tight">{system.name}</div>
      <LocationList locations={system.locations} />
    </div>
  )
}

const SystemList = () => {
  const { data, isSuccess } = useQuery(['systems'], api.availableSystemsQuery)

  return (
    <>
      {isSuccess && !!data.systems.length && (
        <div className="grid grid-flow-row gap-16">
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
