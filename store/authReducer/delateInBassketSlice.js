import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const delateInBassketRequest = createAsyncThunk(
  'delate_favorite',
  async (id, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      method: 'post',
      headers: {Authorization: 'Bearer ' + token},
      data: {basket_product_id: id},
    };
    try {
      const response = await axios(
        `${API_URL}/api/delete_product_in_basket`,
        config,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const delateInBassketSlice = createSlice({
  name: 'delate_favorite',
  initialState: {
    loading: false,
    success_delate: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(delateInBassketRequest.pending, state => {
        state.loading = true;
        state.success_delate = false;
      })

      .addCase(delateInBassketRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.success_delate = true;
        }
      })

      .addCase(delateInBassketRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default delateInBassketSlice.reducer;
