import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai/index'
import { sidebarAtom } from '@/services/store/atoms/sidebar'
import { cx } from '@/utilities/cx'

export const Sidebar = () => {
  const [sidebarState, setSidebarState] = useAtom(sidebarAtom)

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-bold">Menu</div>
      <div className="grid grid-cols-2 gap-2">
        <button
          className={cx('btn flex w-full flex-col items-center justify-center gap-1', {
            'hocus:bg-black/5 dark:hocus:bg-white/5': sidebarState === 'expanded',
            'btn-primary btn-outline': sidebarState === 'collapsed',
          })}
          onClick={() => setSidebarState('collapsed')}
        >
          <ArrowsPointingInIcon className="h-5 w-5" aria-hidden />
          <span>Collapsed</span>
        </button>
        <button
          className={cx('btn flex w-full flex-col items-center justify-center gap-1', {
            'hocus:bg-black/5 dark:hocus:bg-white/5': sidebarState === 'collapsed',
            'btn-primary btn-outline': sidebarState === 'expanded',
          })}
          onClick={() => setSidebarState('expanded')}
        >
          <ArrowsPointingOutIcon className="h-5 w-5" aria-hidden />
          <span>Expanded</span>
        </button>
      </div>
    </div>
  )
}
