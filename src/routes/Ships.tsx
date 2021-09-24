import tw from 'twin.macro'
import { AvailableShips } from 'components/Ships/Available'

export const ShipPage = () => {
  return (
    <div css={tw`container`}>
      <AvailableShips />
    </div>
  )
}
