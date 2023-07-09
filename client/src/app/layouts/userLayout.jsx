import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { EditUserPage } from '../components/page/editUserPage/editUserPage'
import { UsersLoader } from '../components/ui/hoc/usersLoader'


export const UserLayout = () => {
  const { userId, mode } = useParams()


  return (
    <UsersLoader>
        {
          userId
            ? mode === 'edit' ? <EditUserPage userId={userId} /> : <UserPage />
            : <UsersListPage />
        }
    </UsersLoader>
  )
}

