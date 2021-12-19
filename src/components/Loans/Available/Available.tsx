import { useMemo, useState } from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import tw, { theme } from 'twin.macro'
import { Button } from '@/components/Button'
import { Caption } from '@/components/Caption'
import { useAvailableLoansQuery, useTakeOutLoanMutation, spacetradersAPI } from '@/services/spacetraders/core'
import { useAppSelector } from '@/store/hooks'
import { Loan, LoanType } from '@/types/spacetraders'

const AcceptLoan = ({ type }: { type: LoanType }) => {
  const [takeOutLoanMutation, { isLoading }] = useTakeOutLoanMutation()
  const [confirm, setConfirm] = useState(false)
  const selectCurrentLoans = useMemo(() => spacetradersAPI.endpoints.myLoans.select(), [])
  const { data } = useAppSelector(selectCurrentLoans)
  const hasLoan = !!data?.loans.length

  return (
    <Button
      css={[tw`transition-colors duration-75`, confirm && tw`bg-emerald-400 text-emerald-900`]}
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
    </Button>
  )
}

const AvailableLoanItem = ({ loan }: { loan: Loan }) => {
  return (
    <div css={tw`shadow p-4 border border-gray-700 rounded-lg`}>
      <div css={tw`grid grid-flow-col justify-between gap-2`}>
        <div>
          <Caption>
            {loan.type} &ndash; {loan.collateralRequired ? 'Collateral Required' : 'No Collateral'}
          </Caption>
          <div css={tw`flex flex-row space-x-2 items-center py-2`}>
            <HiOutlineCash size={20} color={theme`colors.emerald.400`} />
            <span css={tw`text-2xl font-bold leading-10`}>{loan.amount}</span>
          </div>
        </div>
        <div>
          <AcceptLoan type={loan.type} />
        </div>
      </div>
      <div css={tw`grid grid-cols-3 gap-2`}>
        <div>
          <Caption>Rate</Caption>
          <div css={tw`text-lg font-medium`}>{loan.rate}%</div>
        </div>

        <div>
          <Caption>Term</Caption>
          <div css={tw`text-lg font-medium`}>{loan.termInDays} days</div>
        </div>

        <div>
          <Caption>Repayment</Caption>
          <div css={tw`flex flex-row space-x-1 items-center`}>
            <HiOutlineCash size={16} color={theme`colors.emerald.400`} />
            <div css={tw`text-lg font-medium`}>{loan.amount + loan.amount * (loan.rate / 100)}</div>
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
        <div css={tw`grid grid-cols-3 gap-6`}>
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
      <div css={tw`text-xl font-bold my-4`}>AVAILABLE LOANS</div>
      <AvailableLoanList />
    </div>
  )
}
