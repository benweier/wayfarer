import styles from './system-tag.module.css'
import { type SystemTagProps } from './system-tag.types'

export const SystemTag = ({ type, children }: SystemTagProps) => {
  return (
    <div className={styles['system-tag']} data-system-type={type}>
      {children}
    </div>
  )
}
