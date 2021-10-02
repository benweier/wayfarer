import tw from 'twin.macro'
import { useMyShipsQuery } from 'services/spacetraders/core'
import { YourShip } from 'types/spacetraders'

const OwnedShipItem = ({ ship }: { ship: YourShip }) => {
  return (
    <div css={tw`my-2 shadow p-4 border border-gray-600 rounded-lg`}>
      <div css={tw`grid grid-flow-col auto-cols-min justify-between gap-2`}>
        <div>
          <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>{ship.type}</div>
          <div css={tw`flex flex-row space-x-2 items-center py-2`}>
            <span css={tw`text-2xl font-bold leading-10`}></span>
          </div>
        </div>
        {/* <div>

        </div> */}
      </div>
      <div css={tw`grid grid-flow-col gap-2`}></div>
    </div>
  )
}

const OwnedShipsList = () => {
  const { data } = useMyShipsQuery()

  return (
    <>
      {!!data?.ships.length && (
        <div css={tw`grid grid-cols-3 gap-4`}>
          {data.ships.map((ship) => (
            <OwnedShipItem key={ship.type} ship={ship} />
          ))}
        </div>
      )}
    </>
  )
}

export const OwnedShips = () => {
  return (
    <div>
      <div css={tw`text-xl font-bold my-4`}>OWNED SHIPS</div>
      <OwnedShipsList />
    </div>
  )
}
