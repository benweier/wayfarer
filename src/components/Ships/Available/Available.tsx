import tw from 'twin.macro'
import { SystemSelect } from 'components/SystemSelect'

export const AvailableShips = () => {
  return (
    <div>
      <div css={tw`w-72`}>
        <SystemSelect />
      </div>
    </div>
  )
}
