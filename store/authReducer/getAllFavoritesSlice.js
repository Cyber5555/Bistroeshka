import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllFavoritesRequest = createAsyncThunk(
  'all_favorites',
  async ({rejectWithValue}) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const config = {
        headers: {Authorization: 'Bearer ' + token},
      };
      const response = await axios.get(`${API_URL}/api/get_favorites`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const getAllFavoritesSlice = createSlice({
  name: 'all_favorites',
  initialState: {
    all_favorites: [],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllFavoritesRequest.pending, state => {
        state.loading = true;
      })

      .addCase(getAllFavoritesRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.all_favorites = action.payload?.data?.data;
        }
      })

      .addCase(getAllFavoritesRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default getAllFavoritesSlice.reducer;
