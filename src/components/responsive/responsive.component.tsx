import { type ResponsiveComponentProps } from './responsive.types'
import { useDesktopMediaQuery, useMobileMediaQuery, useTabletMediaQuery } from './use-responsive.hook'

export const Desktop = ({ up, below, children }: ResponsiveComponentProps) => {
  const isDesktop = useDesktopMediaQuery({ up, below })

  return isDesktop ? children : null
}

export const Tablet = ({ up, below, children }: ResponsiveComponentProps) => {
  const isTablet = useTabletMediaQuery({ up, below })

  return isTablet ? children : null
}

export const Mobile = ({ up, below, children }: ResponsiveComponentProps) => {
  const isMobile = useMobileMediaQuery({ up, below })

  return isMobile ? children : null
}
