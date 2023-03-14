import PropTypes from 'prop-types'


export const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
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

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}
