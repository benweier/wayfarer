import { HiOutlineCash } from 'react-icons/hi'
import { useMyLoansQuery, usePayLoanMutation } from '@/services/spacetraders/core'
import { selectUser } from '@/store/auth'
import { useAppSelector } from '@/store/hooks'
import { YourLoan } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number'

const PayLoan = ({ id, repayment }: { id: string; repayment: number }) => {
  const [payLoanMutation, { isLoading }] = usePayLoanMutation()
  const user = useAppSelector(selectUser)

  return (
    <button
      className="btn"
      disabled={isLoading || (user?.credits ?? 0) < repayment}
      onClick={async () => {
        await payLoanMutation({ id })
      }}
    >
      Pay
    </button>
  )
}

const CurrentLoanItem = ({ loan }: { loan: YourLoan }) => {
  return (
    <div className="rounded border border-gray-700 bg-gray-700 bg-opacity-20 p-4 shadow">
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
  const { data } = useMyLoansQuery()

  return (
    <>
      {!!data?.loans.length && (
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
      <CurrentLoanList />
    </div>
  )
}
