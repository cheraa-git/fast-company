import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import localStorageService from '../services/localStorage.service'

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  params: { key: process.env.REACT_APP_FIREBASE_KEY }
})

const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const signUp = async ({ email, password, ...rest }) => {
    const url = '/accounts:signUp'
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      localStorageService.setTokens(data)
      await createUser({ _id: data.localId, email, ...rest })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      const errorObject = {}
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          errorObject.email = 'Пользователь с таким Email уже существует'
          throw errorObject
        }
      }
      throw new Error()
    }
  }

  const createUser = async (data) => {
    try {
      const { content } = await userService.create(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const signIn = async ({ email, password }) => {
    const url = '/accounts:signInWithPassword'
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      localStorageService.setTokens(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      const errorObject = {}
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND') {
          errorObject.email = 'Неверный Email'
          throw errorObject
        }
        if (message === 'INVALID_PASSWORD') {
          errorObject.password = 'Неверный пароль'
          throw errorObject
        }
      }
    }
  }

  const errorCatcher = (e) => {
    const { message } = e.response.data
    setError(message)
  }

  return (
    <AuthContext.Provider value={{ signUp, currentUser, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default AuthProvider
