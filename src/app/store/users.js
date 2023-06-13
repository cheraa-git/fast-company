import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
    isLoading: true,
    error: null
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
    }
  }
})

const { usersReceived, usersRequested, usersRequestFailed } = usersSlice.actions
export const usersReducer = usersSlice.reducer

export const loadUsers = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersReceived(content))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}

export const getUserById = (id) => (state) => state.users.entities.find(user => user._id === id)
export const getUsers = () => (state) => state.users.entities
