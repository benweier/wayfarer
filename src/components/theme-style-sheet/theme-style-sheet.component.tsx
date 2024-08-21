import { PrefersColorScheme } from '@/components/responsive'
import { themeAtom } from '@/store/atoms/theme'
import { useAtomValue } from 'jotai'

export const ThemeStyleSheet = () => {
  const theme = useAtomValue(themeAtom)
  const light = new URL('/css/light.css', import.meta.url)
  const dark = new URL('/css/dark.css', import.meta.url)

  return (
    <PrefersColorScheme
      preference={theme}
      light={<link rel="stylesheet" href={light.href} fetchPriority="high" />}
      dark={<link rel="stylesheet" href={dark.href} fetchPriority="high" />}
    />
  )
}
