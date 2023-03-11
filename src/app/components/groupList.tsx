import _ from 'lodash'

interface GroupListProps<ItemType> {
  items: Record<string, ItemType> | ItemType[]
  onItemSelect: (item: ItemType) => void
  selectedItem?: ItemType
  valueProperty?: string
  contentProperty?: string
}

export const GroupList = <ItemType extends Record<string, any>>(props: GroupListProps<ItemType>): JSX.Element => {
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
