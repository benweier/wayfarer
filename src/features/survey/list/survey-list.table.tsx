import {
  type ColumnFiltersState,
  type SortingState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { TableComponent } from '@/components/table'
import { type SurveyResponse } from '@/types/spacetraders'
import { columns } from './survey-list.columns'

export const SurveyListTable = ({ data }: { data: Array<{ survey: SurveyResponse }> }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'symbol', desc: false }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters },
    enableHiding: true,
    enableFilters: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
  })

  return <TableComponent table={table} />
}
