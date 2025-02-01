import { useMediaQuery } from 'react-responsive'
import { breakpoints } from './breakpoints.conf'
import { usePrefersColorSchemeQuery } from './use-responsive.hook'
import type { ResponsiveComponentProps } from './responsive.types'
import type { ReactNode } from 'react'

export const Desktop = ({ below, fallback, children }: ResponsiveComponentProps) => {
  const query = {
    minWidth: below ? undefined : breakpoints.lg.min,
    maxWidth: 9999999,
  }

  const isDesktop = useMediaQuery(query)

  return isDesktop ? children : fallback
}

export const Tablet = ({ up, below, fallback, children }: ResponsiveComponentProps) => {
  const query = {
    minWidth: below ? 0 : breakpoints.md.min,
    maxWidth: up ? undefined : breakpoints.md.max,
  }
  const isTablet = useMediaQuery(query)

  return isTablet ? children : fallback
}

export const Mobile = ({ up, fallback, children }: ResponsiveComponentProps) => {
  const query = {
    minWidth: 0,
    maxWidth: up ? undefined : breakpoints.sm.max,
  }

  const isMobile = useMediaQuery(query)

  return isMobile ? children : fallback
}

export const PrefersColorScheme = ({
  preference,
  light,
  dark,
}: {
  preference: 'light' | 'dark' | 'system'
  light: ReactNode
  dark: ReactNode
}) => {
  const match = usePrefersColorSchemeQuery('dark')

  if (preference === 'light') return light
  if (preference === 'dark') return dark

  if (match) return dark

  return light
}
