import { TableHeader } from './tableHeader'
import { TableBody } from './tableBody'
import PropTypes from 'prop-types'


const Table = ({ onSort, selectedSort, columns, data, children }) => {
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

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  data: PropTypes.array,
  children: PropTypes.array
}

export { Table }
