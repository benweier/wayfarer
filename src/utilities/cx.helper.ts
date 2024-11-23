import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const tw = extendTailwindMerge({
  cacheSize: 1000,
})

export function cx(...args: ClassValue[]) {
  return tw(clsx(args))
}
