import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { type NavigationResponse } from '@/types/spacetraders'

export type ShipTransitProps = {
  nav: NavigationResponse
}

export type ShipTransitActionProps = {
  trigger: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}
