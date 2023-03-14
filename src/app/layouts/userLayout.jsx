import { useParams } from 'react-router-dom'
import { Users } from '../components/user/users'
import { User } from '../components/user/user'

export const UserLayout = () => {
  const { userId } = useParams()
  return userId ? <User /> : <Users />
}

