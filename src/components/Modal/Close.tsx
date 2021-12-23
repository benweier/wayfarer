import { FiX } from 'react-icons/fi'
import { styled } from 'twin.macro'
import { IconButton } from '@/components/Button'

const Close = styled(IconButton).attrs(() => ({ children: <FiX size={20} /> }))(() => [])

export default Close
