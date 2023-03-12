import { FC } from 'react'
import _ from 'lodash'
import { Columns } from '../../types'

interface TableBodyProps {
  data: Array<Record<string, any>>
  columns: Columns
}

export const TableBody: FC<TableBodyProps> = ({ data, columns }): JSX.Element => {
  const renderContent = (item: any, column: string) => {
    if (columns[column].component) {
      const component = columns[column].component
      if (typeof component === 'function') {
        return component(item)
      }
      return component
    }
    return _.get(item, columns[column].path ?? '')
  }
  return (
    <tbody>
    {data.map((item: any) => (
      <tr key={item._id}>
        {Object.keys(columns).map(column => {
          return <td key={column}>{renderContent(item, column)}</td>
        })}
      </tr>
    ))}
    </tbody>
  )
}
