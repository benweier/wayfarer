import tw from 'twin.macro'
import { SystemSelect } from 'components/Systems/Select'
import { useSystemSelect } from 'components/Systems/Select/useSystemSelect'

export const AvailableShips = () => {
  const systemSelect = useSystemSelect()

  return (
    <div>
      <div css={tw`w-72`}>
        <SystemSelect {...systemSelect} />
      </div>
    </div>
  )
}
