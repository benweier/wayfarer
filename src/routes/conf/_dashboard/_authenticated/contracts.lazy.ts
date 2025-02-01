import { createLazyFileRoute } from '@tanstack/react-router'
import { ContractsRoute } from '@/routes/contracts'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/contracts')({
  component: ContractsRoute,
})
