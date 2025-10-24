// Redux/Slice/landingPageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { langingPageApi } from '../../Api'

export const fetchLandingPageData = createAsyncThunk(
  'landingPage/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(langingPageApi)
      console.log(response);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch data')
    }
  }
)

const initialState = {
  data: null  // Only store data, no loading/error states
}

const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {
    clearLandingPageData: (state) => {
      state.data = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingPageData.fulfilled, (state, action) => {
        state.data = action.payload
      })
      // Remove pending and rejected cases since we don't track loading/error
  }
})

export const { clearLandingPageData } = landingPageSlice.actions
export default landingPageSlice.reducer