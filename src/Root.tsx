import { lazy, StrictMode, Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import tw, { theme } from 'twin.macro'
import { AppStyles } from './components/AppStyles'

const App = lazy(() => import('@/components/App').then((mod) => ({ default: mod.App })))

const Loading = () => (
  <div css={tw`grid justify-center items-center w-screen h-screen animate-pulse`}>
    <GiNorthStarShuriken size={96} color={theme`colors.gray.700`} />
  </div>
)

export const Root = () => (
  <StrictMode>
    <AppStyles />
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StrictMode>
)
