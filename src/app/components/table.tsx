import React, { FC, ReactNode } from 'react'
import { Columns, Sort } from '../../types'
import { TableHeader } from './tableHeader'
import { TableBody } from './tableBody'

interface TableProps {
  data?: any[]
  columns?: Columns
  onSort?: (sort: Sort) => void
  selectedSort?: Sort
  children?: ReactNode
}

export const Table: FC<TableProps> = ({ onSort, selectedSort, columns, data, children }): JSX.Element => {
  return (
    <table className="table container">
      {
        data && columns && onSort && selectedSort && !children &&
        <>
          <TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ columns, data }} />
        </>
      }
      {children}

    </table>
  )
}
