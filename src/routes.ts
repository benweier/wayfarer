import { index, route } from '@react-router/dev/routes'
import type { RouteConfig } from '@react-router/dev/routes'

export default [index('./routes/home.route.tsx'), route('*', './routes/catch-all.route.tsx')] satisfies RouteConfig
