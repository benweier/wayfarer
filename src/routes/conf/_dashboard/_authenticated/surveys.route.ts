import { i18n } from '@/services/i18n'
import { createFileRoute } from '@tanstack/react-router'
import { surveyStore } from '@/store/surveys'

export const Route = createFileRoute('/_dashboard/_authenticated/surveys')({
  loader: () => {
    const { surveys } = surveyStore.getState()

    return {
      surveys,
    }
  },
  head: () => {
    return {
      meta: [{ title: i18n.t('title_template', { title: 'surveys.title', ns: 'meta' }) }],
    }
  },
})
