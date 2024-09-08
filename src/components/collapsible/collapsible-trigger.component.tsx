import * as Collapsible from '@radix-ui/react-collapsible'
import type { CollapsibleTriggerProps } from './collapsible.types'
import { useCollapsibleActions } from './use-collapsible-store.hook'

export const Trigger = ({ children }: CollapsibleTriggerProps) => {
  const actions = useCollapsibleActions()

  return (
    <Collapsible.Trigger
      onClick={() => {
        actions.toggle()
      }}
      asChild
    >
      {children}
    </Collapsible.Trigger>
  )
}
