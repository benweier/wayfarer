import { HiOutlineStatusOffline, HiOutlineStatusOnline, HiRefresh } from 'react-icons/hi'
import { cx } from '@/utilities/cx'
import { useSpaceTradersStatus } from './use-space-traders-status.hook'

export const SpaceTradersStatus = () => {
  const { status, isChecking } = useSpaceTradersStatus()

  return (
    <div
      className={cx({
        'text-emerald-400': status === 'ONLINE',
        'text-rose-400': status === 'OFFLINE',
        'text-yellow-400': isChecking,
      })}
    >
      {status === 'UNKNOWN' && <HiRefresh size={20} />}
      {status === 'ONLINE' && <HiOutlineStatusOnline size={20} />}
      {status === 'OFFLINE' && <HiOutlineStatusOffline size={20} />}
    </div>
  )
}
