import { createContext } from 'react'
import type { SurveyResponse } from '@/types/spacetraders'
import type { FC } from 'react'

export const SurveyContext = createContext<{
  Extract?: FC<{ survey: SurveyResponse }>
  Discard?: FC<{ survey: SurveyResponse }>
}>({})
