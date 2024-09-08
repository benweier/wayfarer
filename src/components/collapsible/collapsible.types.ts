import type * as Collapsible from '@radix-ui/react-collapsible'
import type { PropsWithChildren, ReactNode, RefAttributes } from 'react'

export type CollapsibleRootProps = PropsWithChildren<{
  defaultOpen?: boolean
  disabled?: boolean
  onOpenChange?: (open: boolean) => boolean
  trigger: ReactNode
}>

export type CollapsibleTriggerProps = PropsWithChildren

export type CollapsibleContentProps = Collapsible.CollapsibleContentProps & RefAttributes<HTMLDivElement>

export type CollapsibleStore = {
  isOpen: boolean
  actions: {
    open: () => void
    close: () => void
    toggle: () => void
  }
}

export type CollapsibleImperativeRef = {
  open: () => void
  close: () => void
  toggle: () => void
}
