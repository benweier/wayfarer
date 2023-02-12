import { StrictMode, Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { lazy } from './utilities/lazy'
import './styles/tailwind.css'

const { App } = lazy(() => import('@/components/App'), ['App'])

const Loading = () => (
  <div className="grid h-screen w-screen animate-pulse items-center justify-center text-zinc-200 dark:text-zinc-700">
    <GiNorthStarShuriken size={96} />
  </div>
)

export const Root = () => (
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StrictMode>
)
