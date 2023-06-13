import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'

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
    }
  }
})

const { usersReceived, usersRequested, usersRequestFailed, authRequestSuccess, authRequestFailed } = usersSlice.actions
export const usersReducer = usersSlice.reducer

const authRequested = createAction('users/authRequested')

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
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

export const getUserById = (id) => (state) => state.users.entities.find(user => user._id === id)
export const getUsers = () => (state) => state.users.entities
