import { Bookmark } from '../bookmark'
import { QualitiesList } from '../qualitiesList'
import { useUserContext } from '../../context/userContext'
import { Table } from '../table/table'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const UsersTable = ({ users, onSort, selectedSort }) => {
  const { onDelete } = useUserContext()

  const columns = {
    name: { path: 'name', name: 'Имя', component: user => <Link to={`/users/${user._id}`}>{user.name}</Link> },
    qualities: { name: 'Качество', component: (user) => <QualitiesList qualities={user.qualities} /> },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: { path: 'bookmark', name: 'Избранное', component: user => <Bookmark user={user} /> },
    delete: {
      component: (user) => (
        <button className="btn btn-danger btn-sm m-2" onClick={() => onDelete(user._id)}>delete</button>)
    }
  }

  return (
    <Table data={users} columns={columns} onSort={onSort} selectedSort={selectedSort} />
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export { UsersTable }
