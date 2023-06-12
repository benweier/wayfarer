import { cx } from '@/utilities/cx'
import { SystemTagProps } from './system-tag.types'

const SYSTEM_TYPE_STYLES: Record<string, string> = {
  NEUTRON_STAR: 'bg-slate-500 text-slate-200',
  RED_STAR: 'bg-red-800 text-red-50',
  ORANGE_STAR: 'bg-orange-200 text-orange-900',
  BLUE_STAR: 'bg-sky-300 text-sky-950',
  YOUNG_STAR: 'bg-emerald-300 text-emerald-950',
  WHITE_DWARF: 'bg-gray-100 text-gray-900',
  BLACK_HOLE: 'bg-gray-950 text-gray-100',
  HYPERGIANT: 'bg-violet-300 text-violet-950',
  NEBULA: 'bg-pink-600 text-pink-50',
  UNSTABLE: 'bg-indigo-900 text-indigo-50',
}

export const SystemTag = ({ type, children }: SystemTagProps) => {
  return (
    <div className={cx('bg- rounded-sm px-2 py-1 text-xs font-bold uppercase leading-none', SYSTEM_TYPE_STYLES[type])}>
      {children}
    </div>
  )
}
