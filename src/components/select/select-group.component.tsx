import * as Select from '@radix-ui/react-select'
import type { RefAttributes } from 'react'

export const Group = (props: Select.SelectGroupProps & RefAttributes<HTMLDivElement>) => <Select.Group {...props} />
