import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllHistoryRequest = createAsyncThunk(
  "get_history",
  async (data, { rejectWithValue }) => {

    try {
      const config = {
        headers: { Authorization: "Bearer " + data.token },
      };
      const response = await axios.get(
        `${API_URL}/api/get_orders?page=${data.page}`,
        config,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const getAllHistorySlice = createSlice({
  name: "get_history",
  initialState: {
    loading: false,
    all_history: [],
    stop_paginate: false,
    current_page: 1,
  },
  reducers: {
    clearPagination(state) {
      state.current_page = 1;
      state.stop_paginate = false;
      state.all_history = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllHistoryRequest.pending, state => {
        state.loading = true;
      })

      .addCase(getAllHistoryRequest.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.loading = false;
          if (!state.stop_paginate) {
            state.all_history = [
              ...state.all_history,
              ...action.payload?.data?.data,
            ];
          }
          if (action.payload?.data?.next_page_url === null) {
            state.stop_paginate = true;
          } else if (action.payload?.data?.next_page_url !== null) {
            state.stop_paginate = false;
            state.current_page = state.current_page + 1;
          }
        }
      })

      .addCase(getAllHistoryRequest.rejected, (state, action) => {
        if (!action.payload?.status) {
          state.loading = false;
        }
      });
  },
});

export default getAllHistorySlice.reducer;
export const { clearPagination } = getAllHistorySlice.actions;
