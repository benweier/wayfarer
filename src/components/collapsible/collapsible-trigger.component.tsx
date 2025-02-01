import * as Collapsible from '@radix-ui/react-collapsible'
import { useCollapsibleActions } from './use-collapsible-store.hook'
import type { CollapsibleTriggerProps } from './collapsible.types'

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
