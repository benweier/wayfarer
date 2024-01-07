import { produce } from 'immer'
import { useStore } from 'zustand'
import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'
import { type BoundStoreSelector } from '@/store/store.types'
import { type SurveyResponse } from '@/types/spacetraders'

export type SurveyState = {
  surveys: SurveyResponse[]
}

export type SurveyHandlers = {
  addSurveys: (surveys: SurveyResponse[]) => void
  removeSurvey: (signature: string) => void
}

export type SurveyStore = SurveyState & { actions: SurveyHandlers }

export const surveyStore = createStore<SurveyStore>()(
  persist(
    (set, get) => ({
      surveys: [],
      actions: {
        addSurveys: (surveys) => {
          set(
            produce<SurveyState>((draft) => {
              draft.surveys.push(...surveys)
            }),
          )
        },
        removeSurvey: (signature) => {
          const index = get().surveys.findIndex((survey) => survey.signature === signature)

          if (index === -1) return

          set(
            produce<SurveyState>((draft) => {
              draft.surveys.splice(index, 1)
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
          surveys: state.surveys.filter((survey) => {
            const expiration = new Date(survey.expiration)

            return expiration.getTime() > Date.now()
          }),
        }
      },
    },
  ),
)

export const useSurveyStore: BoundStoreSelector<SurveyStore> = (selector = (state: SurveyStore) => state) =>
  useStore(surveyStore, selector)
