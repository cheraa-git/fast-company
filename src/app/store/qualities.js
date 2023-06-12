import { createSlice } from '@reduxjs/toolkit'


const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: [],
    isLoading: true
  }
})

const qualitiesReducer = qualitiesSlice.reducer

export default qualitiesReducer
