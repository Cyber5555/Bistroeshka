import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteHistoryRequest = createAsyncThunk(
  "delate_history",
  async (id, { rejectWithValue }) => {
    const token = await AsyncStorage.getItem("userToken");
    const config = {
      method: "post",
      headers: { Authorization: "Bearer " + token },
      data: { order_id: id },
    };
    try {
      const response = await axios(
        `${API_URL}/api/delete_order`,
        config,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const deleteHistorySlice = createSlice({
  name: "delate_history",
  initialState: {
    loading: false,
    success_delate: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteHistoryRequest.pending, state => {
        state.loading = true;
        state.success_delate = false;
      })

      .addCase(deleteHistoryRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          state.success_delate = true;
        }
      })

      .addCase(deleteHistoryRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default deleteHistorySlice.reducer;
