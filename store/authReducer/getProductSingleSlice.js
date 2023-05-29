import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getProductSingleRequest = createAsyncThunk(
  'single_products',
  async (data, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `${API_URL}/api/get_product/${data.id}`,
        {headers: {Authorization: 'Bearer ' + token}},
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const getProductSingleSlice = createSlice({
  name: 'single_products',
  initialState: {
    single_product_data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductSingleRequest.pending, state => {
        state.loading = true;
        state.single_product_data = [];
      })

      .addCase(getProductSingleRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.single_product_data = action.payload.data;
        }
      })

      .addCase(getProductSingleRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default getProductSingleSlice.reducer;
