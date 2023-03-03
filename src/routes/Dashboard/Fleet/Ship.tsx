import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Modal as ModalRoot, useModalContext } from '@/components/Modal'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { ROUTES } from '@/config/routes'
import { ViewShip } from '@/features/Fleet'

const ShipModalRoute = () => {
  const closeModal = useModalContext((state) => state.closeModal)

  return (
    <Outlet
      context={{
        action: (
          <button onClick={closeModal} className="btn btn-primary btn-outline">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        ),
      }}
    />
  )
}

export const Modal = () => {
  const navigate = useNavigate()
  const { shipID } = useParams()

  return (
    <ModalRoot size="xl" isOpen={!!shipID} onClose={() => navigate(ROUTES.FLEET)}>
      <ShipModalRoute />
    </ModalRoot>
  )
}

const ShipRoute = () => {
  const { shipID } = useParams()
  const ctx = useOutletContext<{ action?: JSX.Element }>()

  return (
    <div className="grid gap-4 p-4">
      <div className="flex items-center justify-start gap-6">
        {ctx?.action && <div>{ctx.action}</div>}
        <div className="text-title">
          Ship: <span className="font-normal">{shipID}</span>
        </div>
      </div>
      <div className="grid gap-12">
        <QuerySuspenseBoundary>{shipID && <ViewShip symbol={shipID} />}</QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Ship = withQSB()(ShipRoute)
