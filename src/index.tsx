import { StrictMode } from 'react'
import { render } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import App from './components/App'
import AppStyles from './components/AppStyles'
import queryClient from './utilities/query-client'

render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppStyles />
      <App />
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById('root'),
)
