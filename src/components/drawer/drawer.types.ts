import type { CSSProperties, PropsWithChildren, ReactNode, RefAttributes } from 'react'

export type DrawerProps = PropsWithChildren<{
  trigger: ReactNode
  defaultOpen?: boolean
  direction?: 'left' | 'right' | 'bottom'
  modal?: boolean
  shouldScaleBackground?: boolean
}> &
  RefAttributes<DrawerImperativeRef>

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
  shouldScaleBackground?: boolean
}

export type DrawerContentProps = {
  height?: CSSProperties['height']
  width?: CSSProperties['width']
} & WithClassName
