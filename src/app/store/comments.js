import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'


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
    }
  }
})

const { commentsReceived, commentsRequested, commentsRequestFailed } = commentsSlice.actions
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

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoading = () => (state) => state.comments.isLoading

