import React, { FC } from 'react'
import { Columns, Sort } from '../../types'

interface TableHeaderProps {
  onSort: (sort: Sort) => void
  selectedSort: Sort
  columns: Columns
}

export const TableHeader: FC<TableHeaderProps> = ({ onSort, selectedSort, columns }): JSX.Element => {
  const handleSort = (item?: string) => {
    if (!item) return
    if (selectedSort.path === item) {
      onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }

  return (
    <thead>
    <tr>
      {Object.keys(columns).map(column => (
        <th
          key={column}
          onClick={() => handleSort(columns[column].path)}
          scope="col"
          {...{ role: columns[column].path && 'button' }}
        >
          {columns[column].name}
          {
            columns[column].path === selectedSort.path &&
            <i className={`bi bi-caret-${selectedSort.order === 'desc' ? 'down' : 'up'}-fill`} />
          }
        </th>
      ))}
    </tr>
    </thead>
  )
}
