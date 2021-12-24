import tw from 'twin.macro'
import { Box } from '@/components/Box'
import { Grid } from '@/components/Grid'
import { AvailableLoans } from '@/components/Loans/Available'
import { CurrentLoan } from '@/components/Loans/Current'

export const LoanPage = () => {
  return (
    <Box css={tw`container`}>
      <Grid rows="auto" gap={10}>
        <CurrentLoan />
        <AvailableLoans />
      </Grid>
    </Box>
  )
}
