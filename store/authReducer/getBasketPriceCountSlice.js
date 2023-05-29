import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getBasketPriceCountRequest = createAsyncThunk(
  'plus_basket',
  async (token, {rejectWithValue}) => {
    const config = {
      method: 'get',
      headers: {Authorization: 'Bearer ' + token},
    };
    try {
      const response = await axios(
        `${API_URL}/api/basket_all_price_and_count`,
        config,
      );
      console.log(response.data, 'response.data');
      return response.data;
    } catch (error) {
      console.log(error.response.data, 'error.response.data');
      return rejectWithValue(error.response.data);
    }
  },
);

const getBasketPriceCountSlice = createSlice({
  name: 'plus_basket',
  initialState: {
    loading: false,
    all_count: '',
    all_price: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBasketPriceCountRequest.pending, state => {
        state.loading = true;
      })

      .addCase(getBasketPriceCountRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.all_count = action.payload.all_count;
          state.all_price = action.payload.all_price;
        }
      })

      .addCase(getBasketPriceCountRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default getBasketPriceCountSlice.reducer;
