import { cx } from '@/utilities/cx.helper'

export const Wayfarer = ({ className }: { className?: string }) => {
  return <div className={cx('font-black text-foreground-primary', className)}>Wayfarer</div>
}
