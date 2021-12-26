import tw, { styled } from 'twin.macro'
import { Typography } from '@/components/Typography'

export const Caption = styled(Typography).attrs({ size: 'xs', weight: 'bold', leading: 'none' })(() => [
  tw`uppercase text-gray-400`,
])
