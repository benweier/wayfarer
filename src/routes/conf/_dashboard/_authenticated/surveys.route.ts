import { FileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/surveys/surveys-route.meta'
import { surveyStore } from '@/store/surveys'

export const Route = new FileRoute('/_dashboard/_authenticated/surveys').createRoute({
  beforeLoad: () => ({ meta }),
  loader: () => {
    const { surveys } = surveyStore.getState()

    return {
      surveys,
    }
  },
})
