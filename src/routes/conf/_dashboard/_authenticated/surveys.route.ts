import { FileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/surveys/surveys-route.meta'

export const Route = new FileRoute('/_dashboard/_authenticated/surveys').createRoute({
  beforeLoad: () => ({ meta }),
})
