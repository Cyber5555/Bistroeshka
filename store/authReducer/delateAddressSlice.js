import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const delateAddressRequest = createAsyncThunk(
  'delate_address',
  async (data, {rejectWithValue}) => {
    // const token = await AsyncStorage.getItem('userToken');

    const config = {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('userToken')),
      },
      data: data,
    };
    try {
      const response = await axios(`${API_URL}/api/delete_address`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const delateAddressSlice = createSlice({
  name: 'delate_address',
  initialState: {
    loading: false,
    success_delate: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(delateAddressRequest.pending, state => {
        state.loading = true;
        state.success_delate = false;
      })

      .addCase(delateAddressRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.success_delate = true;
        }
      })

      .addCase(delateAddressRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default delateAddressSlice.reducer;
