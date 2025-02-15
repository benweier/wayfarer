import { useAtomValue } from 'jotai'
import { PrefersColorScheme } from '@/components/responsive'
import { themeAtom } from '@/store/atoms/theme'

const light = new URL('/css/light.css', import.meta.url)
const dark = new URL('/css/dark.css', import.meta.url)

export const ThemeStyleSheet = () => {
  const theme = useAtomValue(themeAtom)

  return (
    <PrefersColorScheme
      preference={theme}
      light={<link rel="stylesheet" href={light.href} fetchPriority="high" />}
      dark={<link rel="stylesheet" href={dark.href} fetchPriority="high" />}
    />
  )
}
