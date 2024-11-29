import { twm } from '@/utilities/twm.helper'
import { type ClassValue, clsx } from 'clsx'

export function cx(...args: ClassValue[]) {
  return twm(clsx(args))
}
