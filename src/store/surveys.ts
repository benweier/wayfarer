import { produce } from 'immer'
import { useStore } from 'zustand'
import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'
import { getAuthState } from '@/store/auth'
import { type BoundStoreSelector } from '@/store/store.types'
import { type SurveyResponse } from '@/types/spacetraders'

type SurveyState = {
  surveys: Record<string, SurveyResponse[]>
}

type SurveyHandlers = {
  addSurvey: (survey: SurveyResponse) => void
  removeSurvey: (signature: string) => void
}

type SurveyStore = SurveyState & { actions: SurveyHandlers }

export const store = createStore<SurveyStore>()(
  persist(
    (set, get) => ({
      surveys: {},
      actions: {
        addSurvey: (survey) => {
          const auth = getAuthState()

          if (!auth.isAuthenticated) return

          set(
            produce<SurveyState>((draft) => {
              if (!Object.hasOwn(draft.surveys, auth.agent.symbol)) draft.surveys[auth.agent.symbol] = []
              draft.surveys[auth.agent.symbol].push(survey)
            }),
          )
        },
        removeSurvey: (signature) => {
          const state = get()
          const auth = getAuthState()

          if (!auth.isAuthenticated) return
          if (!Object.hasOwn(state, auth.agent.symbol)) return

          const surveys = state.surveys[auth.agent.symbol]
          const index = surveys.findIndex((survey) => survey.signature === signature)

          if (index === -1) return

          set(
            produce<SurveyState>((draft) => {
              draft.surveys[auth.agent.symbol].splice(index, 1)
            }),
          )
        },
      },
    }),
    {
      version: 0,
      name: 'surveys',
      partialize: (state) => {
        return {
          surveys: Object.entries(state.surveys).reduce<Record<string, SurveyResponse[]>>((acc, [key, surveys]) => {
            acc[key] = surveys.filter((survey) => {
              const expiration = new Date(survey.expiration)

              return expiration.getTime() > Date.now()
            })

            return acc
          }, {}),
        }
      },
    },
  ),
)

export const { getState: getSurveyState, setState: setSurveyState, subscribe: subscribeToSurveyStore } = store

export const useSurveyStore: BoundStoreSelector<SurveyStore> = (selector = (state: SurveyStore) => state) =>
  useStore(store, selector)
