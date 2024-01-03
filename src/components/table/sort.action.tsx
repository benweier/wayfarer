import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { getSortingLabel } from '@/utilities/get-sorting-label.helper'
import { type SortActionProps } from './table.types'

export const Sort = ({ type, column }: SortActionProps) => {
  const sorted = column.getIsSorted()

  return (
    <Button intent={sorted === false ? 'dim' : 'confirm'} kind="flat" icon onClick={column.getToggleSortingHandler()}>
      <AppIcon id={getSortingIcon(sorted, type)} className="size-4" />
      <span className="sr-only">{getSortingLabel(column.id, column.getNextSortingOrder())}</span>
    </Button>
  )
}
