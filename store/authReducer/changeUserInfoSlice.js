import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const changeUserInfoRequest = createAsyncThunk(
  'all_address',
  async (data, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      method: 'post',
      headers: {Authorization: 'Bearer ' + token},
      data: data,
    };
    try {
      const response = await axios(`${API_URL}/api/change_user_data`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const changeUserInfoSlice = createSlice({
  name: 'all_address',
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(changeUserInfoRequest.pending, state => {
        state.loading = true;
      })

      .addCase(changeUserInfoRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
        }
      })

      .addCase(changeUserInfoRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default changeUserInfoSlice.reducer;
