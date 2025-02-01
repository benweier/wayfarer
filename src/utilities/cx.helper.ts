import { clsx } from 'clsx'
import { twm } from '@/utilities/twm.helper'
import type { ClassValue } from 'clsx'

export function cx(...args: ClassValue[]) {
  return twm(clsx(args))
}
