import { useAtom } from 'jotai'
import { type PropsWithChildren } from 'react'
import { cargoDisplayAtom } from '@/store/atoms/cargo.display'
import { cx } from '@/utilities/cx'

export const Layout = ({ children }: PropsWithChildren) => {
  const [cargoDisplayMode] = useAtom(cargoDisplayAtom)

  return (
    <div
      className={cx('grid grid-cols-1 gap-2', {
        'lg:grid-cols-1': cargoDisplayMode === 'list',
        'lg:grid-cols-3': cargoDisplayMode === 'grid',
      })}
    >
      {children}
    </div>
  )
}
