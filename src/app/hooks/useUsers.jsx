import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { Spinner } from '../components/ui/Spinner'

const UserContext = createContext({})

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getUsers = async () => {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setLoading(false)
    } catch (e) {
      errorCatcher(e)
    }
  }

  const errorCatcher = (e) => {
    const { message } = e.response.data
    setError(message)
  }

  return (
    <UserContext.Provider value={{ users }}>
      {!isLoading ? children : <Spinner />}
    </UserContext.Provider>
  )
}
UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}
