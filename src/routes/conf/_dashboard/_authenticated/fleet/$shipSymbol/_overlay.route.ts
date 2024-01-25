import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_authenticated/fleet/$shipSymbol/_overlay')({
  pendingComponent: () => null,
})
