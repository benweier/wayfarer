import { createLazyFileRoute } from '@tanstack/react-router'
import { SurveysRoute } from '@/routes/surveys'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/surveys')({
  component: SurveysRoute,
})
