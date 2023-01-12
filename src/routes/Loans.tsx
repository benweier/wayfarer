import { AvailableLoans } from '@/components/Loans/Available'
import { CurrentLoan } from '@/components/Loans/Current'

export const LoanPage = () => {
  return (
    <div className="grid gap-10">
      <CurrentLoan />
      <AvailableLoans />
    </div>
  )
}
