import { useMediaQuery } from 'react-responsive'
import { breakpoints } from './breakpoints.conf'
import { useContainerQuery } from './use-container-query.hook'

export const useDesktopMediaQuery = (args: { up?: boolean; below?: boolean } = {}) => {
  const query = {
    minWidth: breakpoints.lg.min,
    maxWidth: breakpoints.xl.max,
  }

  if ('below' in args) {
    query.minWidth = breakpoints.xs.min
  }

  return useMediaQuery(query)
}

export const useTabletMediaQuery = (args: { up?: boolean; below?: boolean } = {}) => {
  const query = {
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
  const query = {
    minWidth: breakpoints.xs.min,
    maxWidth: breakpoints.sm.max,
  }

  if ('up' in args) {
    query.maxWidth = breakpoints.xl.max
  }

  return useMediaQuery(query)
}

export const useDesktopContainerQuery = (args: { up?: boolean; below?: boolean } = {}, ref?: HTMLElement | null) => {
  const query = {
    minWidth: breakpoints.lg.min,
    maxWidth: breakpoints.xl.max,
  }

  if ('below' in args) {
    query.minWidth = breakpoints.xs.min
  }

  return useContainerQuery(query, ref)
}

export const useTabletContainerQuery = (args: { up?: boolean; below?: boolean } = {}, ref?: HTMLElement | null) => {
  const query = {
    minWidth: breakpoints.md.min,
    maxWidth: breakpoints.md.max,
  }

  if ('up' in args) {
    query.maxWidth = breakpoints.xl.max
  }

  if ('below' in args) {
    query.minWidth = breakpoints.xs.min
  }

  return useContainerQuery(query, ref)
}

export const useMobileContainerQuery = (args: { up?: boolean; below?: boolean } = {}, ref?: HTMLElement | null) => {
  const query = {
    minWidth: breakpoints.xs.min,
    maxWidth: breakpoints.sm.max,
  }

  if ('up' in args) {
    query.maxWidth = breakpoints.xl.max
  }

  return useContainerQuery(query, ref)
}

export const usePrefersColorSchemeQuery = (preference: 'no-preference' | 'light' | 'dark' | 'system') => {
  const query = {
    query: `(prefers-color-scheme: ${preference})`,
  }

  return useMediaQuery(query)
}
