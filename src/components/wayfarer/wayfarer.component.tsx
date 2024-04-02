import { cx } from 'class-variance-authority'

export const Wayfarer = ({ className }: { className?: string }) => {
  return <div className={cx('text-foreground-primary font-black', className)}>Wayfarer</div>
}
