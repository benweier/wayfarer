import { defer } from 'react-router-dom'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getSurveyState } from '@/store/surveys'

export const meta: MetaFunction = (t) => {
  return [{ title: t('surveys.title', { ns: 'meta' }) }]
}

export const loader = () => {
  try {
    const { surveys } = getSurveyState()

    return defer({
      surveys,
    })
  } catch (err) {
    if (isHttpError(err)) {
      throw new Response(err.statusText, { status: err.status })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
