import { useEffect } from 'react'
import { Spinner } from '../components/ui/spinner'
import { useDispatch } from 'react-redux'
import { logout } from '../store/users'

export const LogoutLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
  }, [])

  return <Spinner />
}
