import { useMediaQuery } from 'react-responsive'
import { breakpoints } from './breakpoints.conf'

export const useDesktopMediaQuery = (args: { up?: boolean } | { below?: boolean } = {}) => {
  const query = {
    minWidth: 'below' in args ? 0 : breakpoints.lg.min,
    maxWidth: 'up' in args ? undefined : breakpoints.xl.max,
  }

  return useMediaQuery(query)
}

export const useTabletMediaQuery = (args: { up?: boolean } | { below?: boolean } = {}) => {
  const query = {
    minWidth: 'below' in args ? 0 : breakpoints.md.min,
    maxWidth: 'up' in args ? 99999 : breakpoints.md.max,
  }

  return useMediaQuery(query)
}

export const useMobileMediaQuery = (args: { up?: boolean } | { below?: boolean } = {}) => {
  const query = {
    minWidth: breakpoints.xs.min,
    maxWidth: 'up' in args ? 99999 : breakpoints.sm.max,
  }

  return useMediaQuery(query)
}

export const usePrefersColorSchemeQuery = (preference: 'no-preference' | 'light' | 'dark' | 'system') => {
  const query = {
    query: `(prefers-color-scheme: ${preference})`,
  }

  return useMediaQuery(query)
}
