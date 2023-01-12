import { useState } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import { useAvailableLoansQuery, useMyLoansQuery, useTakeOutLoanMutation } from '@/services/spacetraders/core'
import { Loan, LoanType } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { formatNumber } from '@/utilities/number'

const AcceptLoan = ({ type }: { type: LoanType }) => {
  const [takeOutLoanMutation, { isLoading }] = useTakeOutLoanMutation()
  const [confirm, setConfirm] = useState(false)
  const { data } = useMyLoansQuery()
  const hasLoan = !!data?.loans.length

  return (
    <button
      className={cx('transition-colors duration-75', { 'bg-emerald-400 text-emerald-900': confirm })}
      disabled={isLoading || hasLoan}
      onBlur={() => setConfirm(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setConfirm(false)
        }
      }}
      onClick={async () => {
        if (!confirm) {
          setConfirm(true)
          return
        }

        await takeOutLoanMutation({ type }).then(() => {
          setConfirm(false)
        })
      }}
    >
      {confirm ? 'Confirm' : 'Accept'}
    </button>
  )
}

const AvailableLoanItem = ({ loan }: { loan: Loan }) => {
  return (
    <div className="rounded border border-gray-700 bg-gray-700 bg-opacity-20 p-4 shadow">
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
  const { data } = useAvailableLoansQuery()

  return (
    <>
      {!!data?.loans.length && (
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
      <AvailableLoanList />
    </div>
  )
}
