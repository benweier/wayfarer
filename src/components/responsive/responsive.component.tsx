import { breakpoints } from '@/components/responsive/breakpoints.conf'
import type { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'
import type { ResponsiveComponentProps } from './responsive.types'
import { usePrefersColorSchemeQuery } from './use-responsive.hook'

export const Desktop = ({ fallback, children }: ResponsiveComponentProps) => {
  const isDesktop = useMediaQuery({
    minWidth: breakpoints.lg.min,
    maxWidth: breakpoints.xl.max,
  })

  return isDesktop ? children : fallback
}

export const Tablet = ({ fallback, children }: ResponsiveComponentProps) => {
  const isTablet = useMediaQuery({
    minWidth: breakpoints.md.min,
    maxWidth: breakpoints.md.max,
  })

  return isTablet ? children : fallback
}

export const Mobile = ({ fallback, children }: ResponsiveComponentProps) => {
  const isMobile = useMediaQuery({
    minWidth: breakpoints.xs.min,
    maxWidth: breakpoints.sm.max,
  })

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
