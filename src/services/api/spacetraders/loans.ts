import { AvailableLoansResponse, Loan, LoanType, YourLoan } from '@/types/spacetraders'
import * as st from './core'

export const myLoansQuery = () => st.get<{ loans: YourLoan[] }>('/my/loans')

export const availableLoansQuery = () => st.get<AvailableLoansResponse>('/types/loans')

export const takeOutLoanMutation = (payload: { type: LoanType }) =>
  st.post<{ credits: number; loan: Loan }, { type: LoanType }>('/types/loans', payload)

export const payLoanMutation = (payload: { id: string }) =>
  st.post<{ credits: number; loan: Loan }, { id: string }>('/types/loans', payload)
