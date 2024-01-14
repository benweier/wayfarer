import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/_dashboard/_authenticated/fleet/$shipSymbol/_overlay').createRoute({
  pendingComponent: () => null,
})
