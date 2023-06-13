import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import { getRandomAvatar, getRandomInt } from '../utils/random'
import history from '../utils/history'

const initialState = localStorageService.getAccessToken()
  ? {
      entities: [],
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: [],
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: state => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
      state.dataLoaded = true
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    userLoggedOut: (state) => {
      state.entities = []
      state.auth = null
      state.isLoggedIn = false
      state.dataLoaded = false
    },
    userUpdated: (state, action) => {
      state.entities = state.entities.map(user => user._id === action.payload._id ? action.payload : user)
    }
  }
})

const {
  usersReceived,
  usersRequested,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdated
} = usersSlice.actions
export const usersReducer = usersSlice.reducer

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const userCreateFailed = createAction('users/userCreateFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const loadUsers = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersReceived(content))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.register({ email, password })
    console.log(data)
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({ userId: data.localId }))
    dispatch(createUser({
      _id: data.localId,
      email,
      rate: getRandomInt(1, 5),
      completedMeetings: getRandomInt(0, 200),
      image: getRandomAvatar(),
      ...rest
    }))
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

function createUser(payload) {
  return async (dispatch) => {
    dispatch(userCreateRequested())
    try {
      const { content } = await userService.create(payload)
      dispatch(userCreated(content))
      history.push('/users')
    } catch (error) {
      dispatch(userCreateFailed())
    }
  }
}

export const login = ({ payload, redirect }) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.login(payload)
    dispatch(authRequestSuccess({ userId: data.localId }))
    localStorageService.setTokens(data)
    history.push(redirect)
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

export const logout = () => async (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

export const updateUser = (data) => async (dispatch, getState) => {
  dispatch(userUpdateRequested())
  const currentUser = getCurrentUser()(getState())
  try {
    if (data.email && data.email !== currentUser?.email) await authService.updateEmail(data.email)
    const { content } = await userService.update({ ...currentUser, ...data })
    dispatch(userUpdated(content))
    history.push(`/users/${content._id}`)
  } catch (error) {
    dispatch(userUpdateFailed())
    const message = error?.response?.data?.error?.message
    if (message === 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN' && window.confirm('To update your email address, you need to log in again. Continue?')) {
      dispatch(logout())
      history.push('/login')
    }
    if (message === 'EMAIL_EXISTS') dispatch(authRequestFailed('Email already exists'))
  }
}

export const getUserById = (id) => (state) => state.users.entities.find(user => user._id === id)
export const getUsers = () => (state) => state.users.entities
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getCurrentUserId = () => (state) => state.users.auth.userId
export const getCurrentUser = () => (state) => state.users.entities.find(user => user._id === state.users.auth.userId)
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
