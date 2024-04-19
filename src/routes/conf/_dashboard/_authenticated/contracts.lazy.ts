import { ContractsRoute } from '@/routes/contracts'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/contracts')({
  component: ContractsRoute,
})
