import { Dialog } from '@headlessui/react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { Modal as ModalRoot } from '@/components/Modal'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { ROUTES } from '@/config/routes'
import { lazy } from '@/utilities/lazy'

const { ViewShip } = lazy(() => import('@/features/Fleet'), ['ViewShip'])

export const Modal = () => {
  const navigate = useNavigate()

  return (
    <ModalRoot onClose={() => navigate(ROUTES.FLEET)}>
      <Outlet />
    </ModalRoot>
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
