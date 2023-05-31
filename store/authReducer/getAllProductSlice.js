import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllProductRequest = createAsyncThunk(
  'all_products',
  async (data, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    // console.log(data);
    try {
      const response = await axios(
        `${API_URL}/api/get_category?page=${data.page}`,
        {
          method: 'post',
          headers: {Authorization: 'Bearer ' + token || data.token},
          // config,
          data,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data, 'error.response.data');
    }
  },
);

const getAllProductSlice = createSlice({
  name: 'all_products',
  initialState: {
    all_product_data: [],
    current_page: 1,
    loading: false,
    stop_paginate: false,
  },
  reducers: {
    clearPagination(state) {
      state.current_page = 1;
      state.stop_paginate = false;
      state.all_product_data = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllProductRequest.pending, state => {
        state.loading = true;
      })

      .addCase(getAllProductRequest.fulfilled, (state, action) => {
        // if (action.payload?.products?.data?.length) {
        state.loading = false;
        // console.log(action.payload?.products?.data);
        if (!state.stop_paginate) {
          state.all_product_data = [
            ...state.all_product_data,
            ...action.payload?.products?.data,
          ];
        }
        if (action.payload?.products?.next_page_url === null) {
          state.stop_paginate = true;
        } else if (action.payload?.products?.next_page_url !== null) {
          state.stop_paginate = false;
          state.current_page = state.current_page + 1;
        }
        // else if (
        //   action.payload.data.next_page_url !== null &&
        //   !state.loading
        // ) {
        //   state.stop_paginate = false;
        //   state.current_page = state.current_page + 1;
        // }
        //     }
        // else
        //   {
        //     state.loading = false;
        //     state.current_page = 1;
        //     state.stop_paginate = true;
        //     // state.all_product_data = [];
        //   }
      })

      .addCase(getAllProductRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});
export default getAllProductSlice.reducer;
export const {clearPagination} = getAllProductSlice.actions;
