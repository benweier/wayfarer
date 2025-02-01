import { createFileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/surveys/surveys-route.meta'
import { surveyStore } from '@/store/surveys'

export const Route = createFileRoute('/_dashboard/_authenticated/surveys')({
  beforeLoad: () => ({ meta }),
  loader: () => {
    const { surveys } = surveyStore.getState()

    return {
      surveys,
    }
  },
})
