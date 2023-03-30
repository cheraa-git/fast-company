import _ from 'lodash'
import PropTypes from 'prop-types'


export const GroupList = ({ items, onItemSelect, selectedItem, valueProperty, contentProperty }) => {
  const normalizedItems = _.isArray(items) ? items : Object.values(items)
  return (
    <ul className="list-group">
      {normalizedItems.map((item) => (
        <li
          key={item[valueProperty]}
          className={`list-group-item ${item === selectedItem ? 'active' : ''}`}
          onClick={() => onItemSelect(item)}
          role="button"
        >
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
}
