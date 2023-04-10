import { createRoot } from 'react-dom/client'
import { Root } from './root.component'

const container = document.getElementById('wayfarer')

if (container) {
  const root = createRoot(container)
  root.render(<Root />)
}
