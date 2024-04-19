import { SurveysRoute } from '@/routes/surveys'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/surveys')({
  component: SurveysRoute,
})
