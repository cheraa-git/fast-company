import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Users } from '../components/user/users'
import { User } from '../components/user/user'

export const UserLayout: FC = () => {
  const { userId } = useParams<{ userId?: string }>()
  return userId ? <User /> : <Users />
}

