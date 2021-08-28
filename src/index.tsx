import { StrictMode } from 'react'
import { render } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'
import { App } from './components/App'
import { AppStyles } from './components/AppStyles'
import { queryClient } from './utilities/query-client'

render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppStyles />
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root'),
)
