import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'
import { Spinner } from '../components/ui/Spinner'

export const LogoutLayout = () => {
  const { logOut } = useAuth()

  useEffect(() => {
    logOut()
  }, [])

  return <Spinner />
}
