import { LinkProps, Link as RouterLink } from 'react-router-dom'
import { cx } from '@/utilities/cx'

export const Link = ({ className, ...props }: LinkProps) => {
  return <RouterLink {...props} className={cx('link', className)} />
}
