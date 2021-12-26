import tw from 'twin.macro'
import { AvailableLoans } from '@/components/Loans/Available'
import { CurrentLoan } from '@/components/Loans/Current'

export const LoanPage = () => {
  return (
    <div css={tw`container`}>
      <div css={tw`grid gap-10`}>
        <CurrentLoan />
        <AvailableLoans />
      </div>
    </div>
  )
}
