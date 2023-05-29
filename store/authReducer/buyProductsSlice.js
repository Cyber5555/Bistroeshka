import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const buyProductsRequest = createAsyncThunk(
  'product_is_bought',
  async ({rejectWithValue}) => {
    // const token = await AsyncStorage.getItem('userToken');

    const config = {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('userToken')),
      },
    };
    try {
      const response = await axios(`${API_URL}/api/add_order`, config);
      console.log(response.data, 'response.data');
      return response.data;
    } catch (error) {
      console.log(error.response.data, 'error.response.data');
      return rejectWithValue(error.response.data);
    }
  },
);

const buyProductsSlice = createSlice({
  name: 'product_is_bought',
  initialState: {
    loading: false,
    product_is_bought: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(buyProductsRequest.pending, state => {
        state.loading = true;
        state.product_is_bought = false;
      })

      .addCase(buyProductsRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.product_is_bought = true;
        }
      })

      .addCase(buyProductsRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default buyProductsSlice.reducer;
