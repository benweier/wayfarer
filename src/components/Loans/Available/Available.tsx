import { useMutation, useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import { useConfirmAction } from '@/hooks/useConfirmAction'
import * as api from '@/services/api/spacetraders'
import { Loan, LoanType } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { formatNumber } from '@/utilities/number'

const AcceptLoan = ({ type }: { type: LoanType }) => {
  const { mutateAsync, isLoading } = useMutation(api.takeOutLoanMutation)
  const { confirm, onClick, onReset } = useConfirmAction(() => mutateAsync({ type }))
  const { data, isSuccess } = useQuery(['loans'], api.myLoansQuery)
  const hasLoan = isSuccess && !!data.loans.length

  return (
    <button
      className={cx('btn', {
        'btn-primary': !confirm,
        'btn-confirm': confirm,
      })}
      disabled={isLoading || hasLoan}
      onBlur={onReset}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          onReset()
        }
      }}
      onClick={onClick}
    >
      {confirm ? 'Confirm' : 'Accept'}
    </button>
  )
}

const AvailableLoanItem = ({ loan }: { loan: Loan }) => {
  return (
    <div className="rounded border border-zinc-200 bg-zinc-300/20 p-4 dark:border-zinc-700 dark:bg-zinc-700/20">
      <div className="grid grid-flow-col justify-between gap-2">
        <div>
          <div className="text-caption">
            {loan.type} &ndash; {loan.collateralRequired ? 'Collateral Required' : 'No Collateral'}
          </div>
          <div className="flex flex-row items-center space-x-2 py-2">
            <HiOutlineCash size={20} className="text-emerald-400" />
            <span className="text-2xl font-bold leading-10">{formatNumber(loan.amount)}</span>
          </div>
        </div>
        <div>
          <AcceptLoan type={loan.type} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <div className="text-caption">Rate</div>
          <div className="text-lg font-medium">{loan.rate}%</div>
        </div>

        <div>
          <div className="text-caption">Term</div>
          <div className="text-lg font-medium">{loan.termInDays} days</div>
        </div>

        <div>
          <div className="text-caption">Repayment</div>
          <div className="flex flex-row items-center space-x-1">
            <HiOutlineCash size={16} className="text-emerald-400" />
            <div className="text-lg font-medium">{formatNumber(loan.amount + loan.amount * (loan.rate / 100))}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AvailableLoanList = () => {
  const { data, isSuccess } = useQuery(['availableLoans'], api.availableLoansQuery)

  return (
    <>
      {isSuccess && (
        <div className="grid grid-cols-2 gap-6 2xl:grid-cols-3">
          {data.loans.map((loan) => (
            <AvailableLoanItem key={loan.type} loan={loan} />
          ))}
        </div>
      )}
    </>
  )
}

export const AvailableLoans = () => {
  return (
    <div>
      <div className="my-4 text-xl font-bold">AVAILABLE LOANS</div>
      <Suspense fallback={null}>
        <AvailableLoanList />
      </Suspense>
    </div>
  )
}
