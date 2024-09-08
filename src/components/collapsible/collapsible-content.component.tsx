import * as Collapsible from '@radix-ui/react-collapsible'
import type { CollapsibleContentProps } from './collapsible.types'

export const Content = ({ ref, children, ...props }: CollapsibleContentProps) => {
  return (
    <Collapsible.Content ref={ref} {...props}>
      {children}
    </Collapsible.Content>
  )
}
