import { useMutation, useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import * as api from '@/services/api/spacetraders'
import { useAuthStore } from '@/services/store/auth'
import { YourLoan } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number'

const PayLoan = ({ id, repayment }: { id: string; repayment: number }) => {
  const { user } = useAuthStore()
  const { mutate, isLoading } = useMutation(api.payLoanMutation)

  return (
    <button
      className="btn btn-primary"
      disabled={isLoading || (user?.credits ?? 0) < repayment}
      onClick={() => {
        mutate({ id })
      }}
    >
      Pay
    </button>
  )
}

const CurrentLoanItem = ({ loan }: { loan: YourLoan }) => {
  return (
    <div className="rounded border border-zinc-200 bg-zinc-300/20 p-4 dark:border-zinc-700 dark:bg-zinc-700/20">
      <div className="grid auto-cols-min grid-flow-col justify-between gap-2">
        <div>
          <div className="text-caption">{loan.type}</div>
          <div className="flex flex-row items-center space-x-2 py-2">
            <HiOutlineCash size={20} className="text-emerald-400" />
            <span className="text-2xl font-bold leading-10">{formatNumber(loan.repaymentAmount)}</span>
          </div>
        </div>
        <div>
          <PayLoan id={loan.id} repayment={loan.repaymentAmount} />
        </div>
      </div>
      <div className="grid grid-flow-col gap-2">
        <div>
          <div className="text-caption">Due</div>
          <div className="text-lg font-medium">{loan.due}</div>
        </div>
      </div>
    </div>
  )
}

const CurrentLoanList = () => {
  const { data, isSuccess } = useQuery(['loans'], api.myLoansQuery)

  return (
    <>
      {isSuccess && (
        <div className="grid grid-cols-3 gap-6">
          {data.loans.map((loan) => (
            <CurrentLoanItem key={loan.type} loan={loan} />
          ))}
        </div>
      )}
    </>
  )
}

export const CurrentLoan = () => {
  return (
    <div>
      <div className="my-4 text-xl font-bold">CURRENT LOAN</div>
      <Suspense fallback={null}>
        <CurrentLoanList />
      </Suspense>
    </div>
  )
}
