import { cx } from '@/utilities/cx'

export const Wayfarer = ({ className }: WithClassName) => {
  return <div className={cx('font-black leading-none text-zinc-800 dark:text-zinc-100', className)}>WAYFARER</div>
}
