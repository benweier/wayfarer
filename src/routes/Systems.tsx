import tw from 'twin.macro'
import { Box } from '@/components/Box'
import { Grid } from '@/components/Grid'
import { SystemList } from '@/components/Systems/List'

export const SystemPage = () => {
  return (
    <Box css={tw`container`}>
      <Grid rows="auto" gap={10}>
        <SystemList />
      </Grid>
    </Box>
  )
}
