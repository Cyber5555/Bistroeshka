import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addFavoriteRequest = createAsyncThunk(
  'add_favorite',
  async (id, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      data: {product_id: id},
      method: 'post',
      headers: {Authorization: 'Bearer ' + token},
    };
    try {
      const response = await axios(`${API_URL}/api/add_favorite`, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const addFavoriteSlice = createSlice({
  name: 'add_favorite',
  initialState: {
    loading: false,
    success_favorite: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addFavoriteRequest.pending, state => {
        state.loading = true;
        state.success_favorite = false;
      })

      .addCase(addFavoriteRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.success_favorite = true;
        }
      })

      .addCase(addFavoriteRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default addFavoriteSlice.reducer;
