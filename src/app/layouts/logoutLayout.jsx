import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'
import { Spinner } from '../components/ui/spinner'

export const LogoutLayout = () => {
  const { logOut } = useAuth()

  useEffect(() => {
    logOut()
  }, [])

  return <Spinner />
}
