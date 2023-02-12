import { cx } from '@/utilities/cx'

export const Wayfarer = ({ className }: WithClassName) => {
  return <div className={cx('font-black leading-none text-black dark:text-white', className)}>Wayfarer</div>
}
