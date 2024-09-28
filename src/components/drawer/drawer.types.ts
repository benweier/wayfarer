import type { CSSProperties, ReactNode } from 'react'

export type DrawerProps = {
  trigger: ReactNode
  defaultOpen?: boolean
  direction?: 'left' | 'right' | 'bottom'
}

export type DrawerImperativeRef = DrawerActions

export type DrawerState = {
  isOpen: boolean
  onClose?: () => void
}

export type DrawerActions = {
  open: () => void
  close: () => void
  toggle: () => void
}

export type DrawerStore = DrawerState & { actions: DrawerActions }

export type DrawerRootProps = {
  trigger: ReactNode
  direction?: 'left' | 'right' | 'bottom'
  modal?: boolean
}

export type DrawerContentProps = {
  height?: CSSProperties['height']
  width?: CSSProperties['width']
} & WithClassName
