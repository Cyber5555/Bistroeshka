import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logoutRequest = createAsyncThunk(
  "logout_user",
  async (token, { rejectWithValue }) => {
    // const token = await AsyncStorage.getItem('userToken');

    try {
      const config = {
        headers: { Authorization: "Bearer " + token },
      };
      const response = await axios.get(
        `${API_URL}/api/logout`,
        config,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const logoutSlice = createSlice({
  name: "logout_user",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logoutRequest.pending, state => {
        state.loading = true;
      })

      .addCase(logoutRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.success_logout = true;
        }
      })

      .addCase(logoutRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default logoutSlice.reducer;
