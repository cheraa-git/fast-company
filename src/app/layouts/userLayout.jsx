import { useHistory, useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { EditUserPage } from '../components/page/editUserPage/editUserPage'


export const UserLayout = () => {
  const history = useHistory()
  const { userId, mode } = useParams()

  if (!userId) return <UsersListPage />
  if (!mode) return <UserPage />
  switch (mode) {
    case 'edit':
      return <EditUserPage userId={userId}/>
    default:
      history.push('/users')
      break
  }
}

