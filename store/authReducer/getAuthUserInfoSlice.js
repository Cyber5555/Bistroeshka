import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';

export const getAuthUserInfoRequest = createAsyncThunk(
  'auth_user_info',
  async (token, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${API_URL}/api/get_auth_user_info`, {
        headers: {Authorization: 'Bearer ' + token.token},
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const getAuthUserInfoSlice = createSlice({
  name: 'auth_user_info',
  initialState: {
    auth_user_info: [],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAuthUserInfoRequest.pending, state => {
        state.loading = true;
      })

      .addCase(getAuthUserInfoRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.auth_user_info = action.payload?.data;
        }
      })

      .addCase(getAuthUserInfoRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default getAuthUserInfoSlice.reducer;
