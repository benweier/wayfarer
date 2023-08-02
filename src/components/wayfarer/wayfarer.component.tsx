import { cx } from '@/utilities/cx'

export const Wayfarer = ({ className }: { className?: string }) => {
  return <div className={cx('font-black leading-none text-black dark:text-white', className)}>Wayfarer</div>
}
