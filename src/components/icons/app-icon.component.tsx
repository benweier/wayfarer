import { SVGProps } from 'react'
import { Icon } from './icon-base.component'

export const AppIcon = (props: SVGProps<SVGSVGElement>) => {
  return <Icon {...props} href="/icons/app.svg" />
}
