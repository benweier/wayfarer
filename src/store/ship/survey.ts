import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type SurveyResponse } from '@/types/spacetraders'

type ShipSurveyState = { surveys: SurveyResponse[] }

type ShipSurveyHandlers = {
  addSurvey: (survey: SurveyResponse) => void
  removeSurvey: (signature: string) => void
}

type ShipSurveyStore = ShipSurveyState & ShipSurveyHandlers

export const useShipSurveyStore = create<ShipSurveyStore>()(
  persist(
    (set, get) => ({
      surveys: [],
      addSurvey: (survey) => {
        set(
          produce((draft) => {
            draft.surveys.push(survey)
          }),
        )
      },
      removeSurvey: (signature) => {
        const index = get().surveys.findIndex((survey) => survey.signature === signature)
        set(
          produce((draft) => {
            if (index > -1) draft.surveys.splice(index, 1)
          }),
        )
      },
    }),
    {
      version: 0,
      name: 'ship.surveys',
      partialize: (state) => ({
        surveys: state.surveys.filter((survey) => {
          const expiration = new Date(survey.expiration)
          return expiration.getTime() > Date.now()
        }),
      }),
    },
  ),
)
