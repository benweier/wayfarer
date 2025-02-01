import { Icon } from './icon-base.component'
import type { SVGProps } from 'react'

export const AppIcon = (props: SVGProps<SVGSVGElement>) => {
  return <Icon {...props} href="/icons/app.svg" />
}
