import { defer } from 'react-router-dom'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'
import { getSurveyStore } from '@/store/surveys'

export const meta: MetaFunction = (t) => {
  return [{ title: t('surveys.title', { ns: 'meta' }) }]
}

export const loader = () => {
  try {
    const auth = getState()
    const { surveys } = getSurveyStore()

    if (!auth.isAuthenticated) return defer({ surveys: [] })
    if (!Object.hasOwn(surveys, auth.agent.symbol)) return defer({ surveys: [] })

    return defer({
      surveys: surveys[auth.agent.symbol],
    })
  } catch (err) {
    if (isHttpError(err)) {
      throw new Response(err.statusText, { status: err.status })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
