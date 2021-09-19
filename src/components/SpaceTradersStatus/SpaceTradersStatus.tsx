import { HiOutlineStatusOffline, HiOutlineStatusOnline } from 'react-icons/hi'
import tw, { css } from 'twin.macro'
import { useSpaceTradersStatus } from './useSpaceTradersStatus'

export const SpaceTradersStatus = () => {
  const { data, isLoading, isFetching, isError } = useSpaceTradersStatus()

  return (
    <div
      css={[
        css`
          transition: color 300ms ease-in-out;
        `,
        data?.status && tw`text-emerald-400`,
        (!data?.status || isError) && tw`text-rose-400`,
        (isLoading || isFetching) && tw`text-yellow-400`,
      ]}
    >
      {data?.status && !isError && <HiOutlineStatusOnline size={20} />}
      {(!data?.status || isError) && <HiOutlineStatusOffline size={20} />}
    </div>
  )
}
