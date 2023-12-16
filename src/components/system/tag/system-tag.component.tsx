import { cx } from 'class-variance-authority'
import { type SystemTagProps } from './system-tag.types'

const SYSTEM_TYPE_STYLES: Record<string, string> = {
  NEUTRON_STAR: 'bg-slate-500 text-slate-50',
  RED_STAR: 'bg-red-700 text-red-50',
  ORANGE_STAR: 'bg-orange-300 text-orange-950',
  BLUE_STAR: 'bg-cyan-400 text-cyan-950',
  YOUNG_STAR: 'bg-emerald-300 text-emerald-950',
  WHITE_DWARF: 'bg-gray-100 text-gray-950',
  BLACK_HOLE: 'bg-gray-950 text-gray-50',
  HYPERGIANT: 'bg-violet-300 text-violet-950',
  NEBULA: 'bg-pink-600 text-pink-50',
  UNSTABLE: 'bg-indigo-600 text-indigo-50',
}

export const SystemTag = ({ type, children }: SystemTagProps) => {
  return <div className={cx('rounded-sm px-2 py-0.5 text-xs font-bold', SYSTEM_TYPE_STYLES[type])}>{children}</div>
}
