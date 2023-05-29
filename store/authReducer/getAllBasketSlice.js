import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllBasketRequest = createAsyncThunk(
  'get_basket',
  async ({rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const config = {
        headers: {Authorization: 'Bearer ' + token},
      };
      const response = await axios.get(
        `${API_URL}/api/get_products_in_basket`,
        config,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const getAllBasketSlice = createSlice({
  name: 'get_basket',
  initialState: {
    loading: false,
    all_basket: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllBasketRequest.pending, state => {
        state.loading = true;
      })

      .addCase(getAllBasketRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.all_basket = action.payload?.data;
        }
      })

      .addCase(getAllBasketRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default getAllBasketSlice.reducer;
