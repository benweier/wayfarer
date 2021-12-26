import tw from 'twin.macro'
import { Overview } from '@/components/Overview'

export const OverviewPage = () => {
  return (
    <div css={tw`container`}>
      <div css={tw`grid gap-10`}>
        <Overview />
      </div>
    </div>
  )
}
