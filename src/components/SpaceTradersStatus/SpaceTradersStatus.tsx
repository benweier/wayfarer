import { HiRefresh, HiOutlineStatusOffline, HiOutlineStatusOnline } from 'react-icons/hi'
import tw, { css } from 'twin.macro'
import { useSpaceTradersStatus } from './useSpaceTradersStatus'

export const SpaceTradersStatus = () => {
  const { status, isChecking } = useSpaceTradersStatus()

  return (
    <div
      css={[
        css`
          transition: color 300ms ease-in-out;
        `,
        status === 'ONLINE' && tw`text-emerald-400`,
        status === 'OFFLINE' && tw`text-rose-400`,
        isChecking && tw`text-yellow-400`,
      ]}
    >
      {status === 'UNKNOWN' && <HiRefresh size={20} />}
      {status === 'ONLINE' && <HiOutlineStatusOnline size={20} />}
      {status === 'OFFLINE' && <HiOutlineStatusOffline size={20} />}
    </div>
  )
}
