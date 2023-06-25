import { ButtonHTMLAttributes, ReactNode } from 'react'
import { NavigationResponse } from '@/types/spacetraders'

export type ShipTransitProps = {
  nav: NavigationResponse
}

export type ShipTransitActionProps = {
  trigger: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}
