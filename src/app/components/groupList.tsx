interface GroupListProps<ItemType> {
  items: Record<string, ItemType>
  onItemSelect: (item: ItemType) => void
  selectedItem?: ItemType
  valueProperty?: string
  contentProperty?: string
}

export const GroupList = <ItemType extends Record<string, any>>(props: GroupListProps<ItemType>): JSX.Element => {
  const { items, onItemSelect, selectedItem, valueProperty = '_id', contentProperty = 'name' } = props
  return (
    <ul className="list-group">
      {Object.values(items).map((item) => (
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
