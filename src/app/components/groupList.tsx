import _ from 'lodash'

interface GroupListProps {
  items: Record<string, any> | any[]
  onItemSelect: (item: any) => void
  selectedItem?: any
  valueProperty?: string
  contentProperty?: string
}

export const GroupList = (props: GroupListProps): JSX.Element => {
  const { items, onItemSelect, selectedItem, valueProperty = '_id', contentProperty = 'name' } = props
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
