import tw from 'twin.macro'
import { SystemList } from '@/components/Systems/List'

export const SystemPage = () => {
  return (
    <div css={tw`container`}>
      <div css={tw`grid grid-flow-row gap-10`}>
        <SystemList />
      </div>
    </div>
  )
}
