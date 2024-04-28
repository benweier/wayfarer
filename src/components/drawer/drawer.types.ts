import type { ReactNode } from 'react'

export type DrawerProps = {
  trigger: ReactNode
  defaultOpen?: boolean
  direction?: 'left' | 'right' | 'bottom'
}

export type DrawerImperativeRef = {
  openDrawer: () => void
  closeDrawer: () => void
}

export type DrawerState = {
  isOpen: boolean
  onClose?: () => void
}

export type DrawerActions = {
  openDrawer: () => void
  closeDrawer: () => void
}

export type DrawerStore = DrawerState & { actions: DrawerActions }
