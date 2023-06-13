import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import localStorageService from '../services/localStorage.service'
import { Spinner } from '../components/ui/spinner'
import { useHistory } from 'react-router-dom'
import { getRandomAvatar } from '../utils/random'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  params: { key: process.env.REACT_APP_FIREBASE_KEY }
})

const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const history = useHistory()
  const [currentUser, setUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  useEffect(() => {
    if (localStorageService.getAccessToken()) getUserData()
    else setLoading(false)
  }, [])

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser()
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const signUp = async ({ email, password, ...rest }) => {
    const url = '/accounts:signUp'
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      localStorageService.setTokens(data)
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: getRandomAvatar(),
        ...rest
      })
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
      await getUserData()
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log(message)
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND' || message === 'INVALID_PASSWORD') {
          throw new Error('Неверный Email или пароль')
        } else {
          throw new Error('Слишком много попыток. Попробуйте позже')
        }
      }
      throw new Error('Неизвестная ошибка. Попробуйте позже')
    }
  }

  const updateUser = async (data) => {
    const url = '/accounts:update'
    try {
      if (data.email && data.email !== currentUser?.email) {
        await httpAuth.post(url, { idToken: localStorageService.getAccessToken(), email: data.email })
      }
      const { content } = await userService.update({ ...currentUser, ...data })
      setUser(content)
    } catch (error) {
      console.log(error)
      errorCatcher(error)
      const { code, message } = error.response.data.error
      const errorObject = {}
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          errorObject.email = 'Пользователь с таким Email уже существует'
          throw errorObject
        }
        if (message === 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN') {
          if (window.confirm('To update your email address, you need to log in again. Continue?')) {
            logOut()
            history.push('/login')
          }
        }
      }
      throw new Error('Неизвестная ошибка. Попробуйте позже')
    }
  }

  const logOut = () => {
    localStorageService.removeAuthData()
    setUser(null)
    history.push('/')
  }

  const errorCatcher = (e) => {
    const { message } = e.response.data
    setError(message)
  }

  return (
    <AuthContext.Provider value={{ signUp, currentUser, signIn, logOut, updateUser }}>
      {!isLoading ? children : <Spinner />}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default AuthProvider
