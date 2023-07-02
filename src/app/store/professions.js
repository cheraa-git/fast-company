import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'


const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: state => {
      state.isLoading = true
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { professionsReceived, professionsRequested, professionsRequestFailed } = professionsSlice.actions
export const professionsReducer = professionsSlice.reducer

function isOutdated(timestamp) {
  return Date.now() - timestamp > 1000 * 60 * 10
}

export const loadProfessions = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions
  if (!isOutdated(lastFetch)) return
  dispatch(professionsRequested())
  try {
    const { content } = await professionService.get()
    dispatch(professionsReceived(content))
  } catch (error) {
    dispatch(professionsRequestFailed(error.message))
  }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoading = () => (state) => state.professions.isLoading
export const getProfessionById = (id) => (state) => state.professions.entities.find(p => p._id === id)
