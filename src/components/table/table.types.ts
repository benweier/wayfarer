import { type Column, type Row, type Table } from '@tanstack/react-table'
import { type FC } from 'react'

export type TableProps<T> = {
  table: Table<T>
  Row?: FC<{ row: Row<T> }>
}

export type RowProps = {
  className?: string
  row: Row<any>
}

export type SortActionProps = {
  column: Column<any>
  type?: 'alpha' | 'numeric'
}
