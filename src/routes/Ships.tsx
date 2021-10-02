import tw from 'twin.macro'
import { AvailableShips } from 'components/Ships/Available'
import { OwnedShips } from 'components/Ships/Owned'

export const ShipPage = () => {
  return (
    <div css={tw`container`}>
      <div css={tw`grid grid-flow-row gap-10`}>
        <OwnedShips />
        <AvailableShips />
      </div>
    </div>
  )
}
