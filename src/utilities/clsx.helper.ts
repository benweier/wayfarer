import { cx } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import { twMerge } from 'tailwind-merge'

export function clsx(...args: ClassValue[]) {
  return twMerge(cx(args))
}
