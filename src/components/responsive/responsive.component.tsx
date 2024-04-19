import type { ReactNode } from 'react'
import type { ResponsiveComponentProps } from './responsive.types'
import {
  useDesktopMediaQuery,
  useMobileMediaQuery,
  usePrefersColorSchemeQuery,
  useTabletMediaQuery,
} from './use-responsive.hook'

export const Desktop = ({ up, below, fallback, children }: ResponsiveComponentProps) => {
  const isDesktop = useDesktopMediaQuery({ up, below })

  return isDesktop ? children : fallback
}

export const Tablet = ({ up, below, fallback, children }: ResponsiveComponentProps) => {
  const isTablet = useTabletMediaQuery({ up, below })

  return isTablet ? children : fallback
}

export const Mobile = ({ up, below, fallback, children }: ResponsiveComponentProps) => {
  const isMobile = useMobileMediaQuery({ up, below })

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
