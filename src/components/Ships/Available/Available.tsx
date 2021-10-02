import tw from 'twin.macro'
import { SystemSelect } from 'components/Systems/Select'
import { useSystemSelect } from 'components/Systems/Select/useSystemSelect'
import { useShipListingsQuery } from 'services/spacetraders/core'
import { Ship, System } from 'types/spacetraders'

const AvailableShipItem = ({ ship }: { ship: Ship }) => {
  return (
    <div css={tw`my-2 shadow p-4 border border-gray-700 rounded-lg`}>
      <div css={tw`grid grid-flow-col justify-between gap-2`}>
        <div>
          <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>{ship.type}</div>
          <div css={tw`flex flex-row space-x-2 items-center py-2`}>
            <span css={tw`text-2xl font-bold leading-10`}>
              {ship.manufacturer} {ship.class}
            </span>
          </div>
        </div>
        {/* <div>

        </div> */}
      </div>
      <div css={tw`grid grid-cols-3 gap-2`}>
        <div>
          <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>Max Cargo</div>
          <div css={tw`text-lg font-medium`}>{ship.maxCargo}</div>
        </div>

        <div>
          <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>Speed</div>
          <div css={tw`text-lg font-medium`}>{ship.speed}</div>
        </div>

        <div>
          <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>Plating</div>
          <div css={tw`text-lg font-medium`}>{ship.plating}</div>
        </div>
      </div>
    </div>
  )
}

const AvailableShipList = ({ system }: { system: System }) => {
  const { data } = useShipListingsQuery({ system: system.symbol })

  if (!data) return null

  return (
    <>
      {!!data?.shipListings.length && (
        <div css={tw`grid grid-cols-3 gap-4`}>
          {data.shipListings.map((ship) => (
            <AvailableShipItem key={ship.type} ship={ship} />
          ))}
        </div>
      )}
    </>
  )
}

export const AvailableShips = () => {
  const systemSelect = useSystemSelect()

  return (
    <div>
      <div css={tw`text-xl font-bold my-4`}>AVAILABLE SHIPS</div>
      <div css={tw`w-72`}>
        <SystemSelect {...systemSelect} />
      </div>
      {systemSelect.selected && <AvailableShipList system={systemSelect.selected} />}
    </div>
  )
}
