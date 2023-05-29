import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addBasketRequest = createAsyncThunk(
  'new_basket',
  async (data, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      method: 'post',
      headers: {Authorization: 'Bearer ' + token},
      data: {product_id: data},
    };
    try {
      const response = await axios(
        `${API_URL}/api/add_product_to_basket`,
        config,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const addBasketSlice = createSlice({
  name: 'new_basket',
  initialState: {
    // all_address_data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addBasketRequest.pending, state => {
        state.loading = true;
      })

      .addCase(addBasketRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
        }
      })

      .addCase(addBasketRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default addBasketSlice.reducer;
