import { cx } from '@/utilities/cx'

export const Wayfarer = ({ className }: { className?: string }) => {
  return <div className={cx('font-black text-black dark:text-white', className)}>Wayfarer</div>
}
