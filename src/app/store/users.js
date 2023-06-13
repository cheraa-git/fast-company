import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import { getRandomAvatar, getRandomInt } from '../utils/random'
import history from '../utils/history'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false
  },
  reducers: {
    usersRequested: state => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload, isLoggedIn: true }
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload)
    }
  }
})

const {
  usersReceived,
  usersRequested,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated
} = usersSlice.actions
export const usersReducer = usersSlice.reducer

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const userCreateFailed = createAction('users/userCreateFailed')

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


export const getUserById = (id) => (state) => state.users.entities.find(user => user._id === id)
export const getUsers = () => (state) => state.users.entities
