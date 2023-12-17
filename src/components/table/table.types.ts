import { type Row, type Table } from '@tanstack/react-table'
import { type FC } from 'react'

export type TableProps<T> = {
  table: Table<T>
  Row?: FC<{ row: Row<T> }>
}

export type RowProps = {
  row: Row<any>
}
