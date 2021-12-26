import tw from 'twin.macro'
import { SystemList } from '@/components/Systems/List'

export const SystemPage = () => {
  return (
    <div css={tw`container`}>
      <div css={tw`grid gap-10`}>
        <SystemList />
      </div>
    </div>
  )
}
