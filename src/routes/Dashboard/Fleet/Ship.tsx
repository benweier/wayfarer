import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { ROUTES } from '@/config/routes'
import { lazy } from '@/utilities/lazy'

const { ViewShip } = lazy(() => import('@/features/Fleet'), ['ViewShip'])

export const Modal = () => {
  const navigate = useNavigate()

  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => navigate(ROUTES.FLEET)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-50/50 backdrop-blur-xs dark:bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0 scale-75"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <Outlet />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

const ShipRoute = () => {
  const { shipID } = useParams()

  return (
    <Dialog.Panel className="grid w-full max-w-7xl transform gap-4 overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 ring ring-black/5 transition-all dark:border-zinc-700 dark:bg-zinc-800 dark:ring-zinc-50/10">
      <Dialog.Title className="text-title" as="div">
        Ship: <span className="font-normal">{shipID}</span>
      </Dialog.Title>
      <Dialog.Description as="div">
        <QuerySuspenseBoundary>{shipID && <ViewShip id={shipID} />}</QuerySuspenseBoundary>
      </Dialog.Description>
    </Dialog.Panel>
  )
}

export const Ship = withQSB()(ShipRoute)
