import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addNewAddressRequest = createAsyncThunk(
  'new_address',
  async (data, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      method: 'post',
      headers: {Authorization: 'Bearer ' + token},
      data: data,
    };
    try {
      const response = await axios(`${API_URL}/api/addAddress`, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const addNewAddressSlice = createSlice({
  name: 'new_address',
  initialState: {
    // all_address_data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addNewAddressRequest.pending, state => {
        state.loading = true;
      })

      .addCase(addNewAddressRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
        }
      })

      .addCase(addNewAddressRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default addNewAddressSlice.reducer;
