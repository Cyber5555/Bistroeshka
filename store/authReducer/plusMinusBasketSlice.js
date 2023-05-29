import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const plusMinusBasketRequest = createAsyncThunk(
  'plus_basket',
  async (data, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      method: 'post',
      headers: {Authorization: 'Bearer ' + token},
      data: data,
    };
    try {
      const response = await axios(
        `${API_URL}/api/change_product_count_in_basket`,
        config,
      );
      console.log(response.data, 'response.data');
      return response.data;
    } catch (error) {
      console.log(error.response.data, 'error.response.data plus minus');
      return rejectWithValue(error.response.data);
    }
  },
);

const plusMinusBasketSlice = createSlice({
  name: 'plus_basket',
  initialState: {
    loading: false,
    success_count_change: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(plusMinusBasketRequest.pending, state => {
        state.loading = true;
        state.success_count_change = false;
      })

      .addCase(plusMinusBasketRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.success_count_change = true;
        }
      })

      .addCase(plusMinusBasketRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default plusMinusBasketSlice.reducer;
