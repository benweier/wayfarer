import { type MediaQueryAllQueryable, useMediaQuery } from 'react-responsive'
import { breakpoints } from './breakpoints.conf'

export const useDesktopMediaQuery = (args: { up?: boolean; below?: boolean } = {}) => {
  const query: MediaQueryAllQueryable = {
    minWidth: breakpoints.lg.min,
    maxWidth: breakpoints.xl.max,
  }

  if ('below' in args) {
    query.minWidth = breakpoints.xs.min
  }

  return useMediaQuery(query)
}

export const useTabletMediaQuery = (args: { up?: boolean; below?: boolean } = {}) => {
  const query: MediaQueryAllQueryable = {
    minWidth: breakpoints.md.min,
    maxWidth: breakpoints.md.max,
  }

  if ('up' in args) {
    query.maxWidth = breakpoints.xl.max
  }

  if ('below' in args) {
    query.minWidth = breakpoints.xs.min
  }

  return useMediaQuery(query)
}

export const useMobileMediaQuery = (args: { up?: boolean; below?: boolean } = {}) => {
  const query: MediaQueryAllQueryable = {
    minWidth: breakpoints.xs.min,
    maxWidth: breakpoints.sm.max,
  }

  if ('up' in args) {
    query.maxWidth = breakpoints.xl.max
  }

  return useMediaQuery(query)
}
