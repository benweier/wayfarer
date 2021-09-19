import { HiOutlineCash } from 'react-icons/hi'
import tw from 'twin.macro'
import { Button } from 'components/Button'
import { useMyLoansQuery, usePayLoanMutation } from 'services/spacetraders/core'
import { selectUser } from 'store/auth'
import { useAppSelector } from 'store/hooks'
import { YourLoan } from 'types/spacetraders'

const PayLoan = ({ id, repayment }: { id: string; repayment: number }) => {
  const [payLoanMutation, { isLoading }] = usePayLoanMutation()
  const user = useAppSelector(selectUser)

  return (
    <Button
      disabled={isLoading || (user?.credits ?? 0) < repayment}
      onClick={async () => {
        await payLoanMutation({ id })
      }}
    >
      Pay
    </Button>
  )
}

const CurrentLoanItem = ({ loan }: { loan: YourLoan }) => {
  return (
    <div css={tw`my-2 shadow p-4 border border-gray-600 rounded-lg`}>
      <div css={tw`grid grid-flow-col auto-cols-min justify-between gap-2`}>
        <div>
          <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>{loan.type}</div>
          <div css={tw`flex flex-row space-x-2 items-center py-2`}>
            <HiOutlineCash size={20} />
            <span css={tw`text-2xl font-bold leading-10`}>{loan.repaymentAmount}</span>
          </div>
        </div>
        <div>
          <PayLoan id={loan.id} repayment={loan.repaymentAmount} />
        </div>
      </div>
      <div css={tw`grid grid-flow-col gap-2`}>
        <div>
          <div css={tw`text-xs leading-none uppercase font-bold text-gray-400`}>Due</div>
          <div css={tw`text-lg font-medium`}>{loan.due}</div>
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
        <div css={tw`grid grid-cols-3 gap-4`}>
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
      <div css={tw`text-xl font-bold my-4`}>CURRENT LOAN</div>
      <CurrentLoanList />
    </div>
  )
}
