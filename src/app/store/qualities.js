import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'


const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: state => {
      state.isLoading = true
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { qualitiesReceived, qualitiesRequested, qualitiesRequestFailed } = qualitiesSlice.actions
export const qualitiesReducer = qualitiesSlice.reducer

function isOutdated(timestamp) {
  return Date.now() - timestamp > 1000 * 60 * 10
}

export const loadQualities = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities
  if (!isOutdated(lastFetch)) return
  dispatch(qualitiesRequested())
  try {
    const { content } = await qualityService.fetchAll()
    dispatch(qualitiesReceived(content))
  } catch (error) {
    dispatch(qualitiesRequestFailed(error.message))
  }
}

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => state => state.qualities.isLoading
export const getQualitiesByIds = (ids) => (state) => {
  const qualitiesArray = []
  if (state.qualities.entities) {
    for (const id of ids) {
      for (const quality of state.qualities.entities) {
        if (quality._id === id) {
          qualitiesArray.push(quality)
          break
        }
      }
    }
  }
  return qualitiesArray
}

