import type { SurveyResponse } from '@/types/spacetraders'
import { type FC, createContext } from 'react'

export const SurveyContext = createContext<{
  Extract?: FC<{ survey: SurveyResponse }>
  Discard?: FC<{ survey: SurveyResponse }>
}>({})
