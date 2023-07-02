import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import { nanoid } from 'nanoid'
import { getCurrentUserId } from './users'


const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: [],
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: state => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    add: (state, action) => {
      state.entities = [...state.entities, action.payload]
      state.isLoading = false
    },
    remove: (state, action) => {
      state.entities = state.entities.filter(comment => comment._id !== action.payload)
      state.isLoading = false
    }
  }
})

const { commentsReceived, commentsRequested, commentsRequestFailed, add, remove } = commentsSlice.actions
export const commentsReducer = commentsSlice.reducer


export const loadComments = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.get(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const createComment = (data, pageId) => async (dispatch, getState) => {
  dispatch(commentsRequested())
  const userId = getCurrentUserId()(getState())
  const comment = { ...data, _id: nanoid(), pageId, created_at: Date.now(), userId }
  try {
    const { content } = await commentService.createComment(comment)
    dispatch(add(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const removeComment = (id) => async (dispatch) => {
  try {
    await commentService.remove(id)
    dispatch(remove(id))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoading = () => (state) => state.comments.isLoading

