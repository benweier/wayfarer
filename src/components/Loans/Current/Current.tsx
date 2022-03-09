import { HiOutlineCash } from 'react-icons/hi'
import tw, { theme } from 'twin.macro'
import { Button } from '@/components/Button'
import { Caption } from '@/components/Caption'
import { useMyLoansQuery, usePayLoanMutation } from '@/services/spacetraders/core'
import { selectUser } from '@/store/auth'
import { useAppSelector } from '@/store/hooks'
import { YourLoan } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number'

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
    <div css={tw`shadow p-4 border border-gray-600 rounded`}>
      <div css={tw`grid grid-flow-col auto-cols-min justify-between gap-2`}>
        <div>
          <Caption>{loan.type}</Caption>
          <div css={tw`flex flex-row space-x-2 items-center py-2`}>
            <HiOutlineCash size={20} color={theme`colors.emerald.400`} />
            <span css={tw`text-2xl font-bold leading-10`}>{formatNumber(loan.repaymentAmount)}</span>
          </div>
        </div>
        <div>
          <PayLoan id={loan.id} repayment={loan.repaymentAmount} />
        </div>
      </div>
      <div css={tw`grid grid-flow-col gap-2`}>
        <div>
          <Caption>Due</Caption>
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
        <div css={tw`grid grid-cols-3 gap-6`}>
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
