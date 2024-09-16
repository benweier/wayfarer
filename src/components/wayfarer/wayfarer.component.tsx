import { cx } from 'class-variance-authority'

export const Wayfarer = ({ className }: { className?: string }) => {
  return <div className={cx('font-black text-foreground-primary', className)}>Wayfarer</div>
}
