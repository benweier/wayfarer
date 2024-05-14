import { Wrapper } from '@/test/utilities/wrapper.component'
import { type RenderOptions, render as rtlRender } from '@testing-library/react'
import type { ReactElement } from 'react'

export function render(ui: ReactElement, options?: RenderOptions) {
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}
