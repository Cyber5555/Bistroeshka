import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";

export const checkCodeForgotPasswordRequest = createAsyncThunk(
  "check_remember_token",
  async (data, { rejectWithValue }) => {
    console.log(data, "data");
    try {
      const response = await axios.post(
        `${API_URL}/api/check_remember_token`,
        data,
      );
      console.log(response.data, "response.data");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data, "error.response.data");
    }
  },
);

const checkCodeForgotPasswordSlice = createSlice({
  name: "check_remember_token",
  initialState: {
    loading: false,
    verify_register_success: false,
    verify_register_error: false,
    error_border: false,
  },
  reducers: {
    clearState(state) {
      state.verify_register_success = false;
      state.verify_register_error = false;
    },
    clearBorder(state) {
      state.error_border = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkCodeForgotPasswordRequest.pending, state => {
        state.loading = true;
        state.error_border = false;
      })

      .addCase(checkCodeForgotPasswordRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.verify_register_success = true;
          state.error_border = false;
        }
      })

      .addCase(checkCodeForgotPasswordRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          state.verify_register_error = true;
          state.loading = false;
          state.error_border = true;
        }
      });
  },
});

export default checkCodeForgotPasswordSlice.reducer;
export const { clearState, clearBorder } = checkCodeForgotPasswordSlice.actions;
