import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllAddressRequest = createAsyncThunk(
  'all_address',
  async (data, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      method: 'post',
      headers: {Authorization: 'Bearer ' + token},
      data: data,
    };
    try {
      const response = await axios.get(`${API_URL}/api/get_address`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const getAllAddressSlice = createSlice({
  name: 'all_address',
  initialState: {
    all_address_data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllAddressRequest.pending, state => {
        state.loading = true;
      })

      .addCase(getAllAddressRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.all_address_data = action.payload.data;
        }
      })

      .addCase(getAllAddressRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default getAllAddressSlice.reducer;
