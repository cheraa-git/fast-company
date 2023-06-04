import { Bookmark } from '../common/bookmark'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Table from '../common/table'
import Qualities from './qualities'
import { Profession } from './Profession'


export const UsersTable = ({ users, onSort, selectedSort, onToggleBookmark }) => {
  const columns = {
    name: { path: 'name', name: 'Имя', component: user => <Link to={`/users/${user._id}`}>{user.name}</Link> },
    qualities: { name: 'Качество', component: (user) => <Qualities qualities={user.qualities} /> },
    professions: { name: 'Профессия', component: (user) => <Profession id={user.profession} /> },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: { path: 'bookmark', name: 'Избранное', component: user => <Bookmark {...{ user, onToggleBookmark }} /> }
  }

  return (
    <Table data={users} columns={columns} onSort={onSort} selectedSort={selectedSort} />
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}

