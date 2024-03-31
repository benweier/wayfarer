import { useAtomValue } from 'jotai'
import { type ReactNode } from 'react'
import { themeAtom } from '@/store/atoms/theme'
import { type ResponsiveComponentProps } from './responsive.types'
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
  light,
  dark,
  fallback,
}: {
  light?: ReactNode
  dark?: ReactNode
  fallback?: ReactNode
}) => {
  const theme = useAtomValue(themeAtom)
  const match = usePrefersColorSchemeQuery(theme)

  if (match && theme === 'light') return light
  if (match && theme === 'dark') return dark

  return fallback
}
