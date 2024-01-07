import { type router } from './router.conf'

declare module '@tanstack/react-router' {
  type Register = {
    router: typeof router
  }
}
