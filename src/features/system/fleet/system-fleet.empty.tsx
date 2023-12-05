import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useAuthStore } from '@/store/auth'
import { type SystemsResponse } from '@/types/spacetraders'

export const SystemFleetEmpty = ({ system }: { system: SystemsResponse }) => {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
      <div className="text-center">
        You have no ships in <span className="font-bold">{system.symbol}</span>
      </div>
      {!isAuthenticated && (
        <div className="text-secondary text-center text-sm">
          <Link
            to={ROUTES.LOGIN}
            state={{
              redirect: { destination: `/systems/${system.symbol}` },
            }}
            className="link"
          >
            Log in
          </Link>{' '}
          to see your ships
        </div>
      )}
    </div>
  )
}