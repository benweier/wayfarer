import { Link } from 'react-router'
import { Button } from '@/components/button'

export default function HomeRoute() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 space-y-6">
          <h1 className="text-h1 font-bold text-white">Wayfarer</h1>
          <p className="text-foreground-primary mx-auto mb-8 max-w-2xl text-lg">
            Navigate the cosmos, trade across star systems, and build your space trading empire. Wayfarer is your
            gateway to the SpaceTraders universe.
          </p>
        </div>

        <div className="space-y-4 sm:flex sm:justify-center sm:space-y-0 sm:space-x-6">
          <Button asChild>
            <Link to="/login">Start Your Journey</Link>
          </Button>

          <Button asChild intent="neutral" kind="outline">
            <a href="https://spacetraders.io" target="_blank" rel="noopener noreferrer">
              Learn About SpaceTraders
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
