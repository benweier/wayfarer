import { StrictMode } from 'react'
import { App } from '@/components/app'
import './styles/tailwind.css'
import './root.styles.css'

export const Root = () => (
  <StrictMode>
    <App />
  </StrictMode>
)
