import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'


export const UserLayout = () => {
  const { userId } = useParams()
  return userId ? <UserPage /> : <UsersListPage />
}

