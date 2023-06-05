import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { EditUserPage } from '../components/page/editUserPage/editUserPage'
import { UserProvider } from '../hooks/useUsers'


export const UserLayout = () => {
  const { userId, mode } = useParams()
  return (
    <UserProvider>
      {
        userId
          ? mode === 'edit' ? <EditUserPage userId={userId} /> : <UserPage />
          : <UsersListPage />
      }
    </UserProvider>
  )
}

