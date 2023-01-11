import { createRoot } from 'react-dom/client'
import { Root } from './Root'

const container = document.getElementById('wayfarer')

if (container) {
  const root = createRoot(container)
  root.render(<Root />)
}
