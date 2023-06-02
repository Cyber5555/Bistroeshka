import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";

export const resendCodeVerifyRequest = createAsyncThunk(
  "resend_code",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/send_remember_token`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const resendCodeVerifySlice = createSlice({
  name: "resend_code",
  initialState: {
    loading: false,
    success_code: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(resendCodeVerifyRequest.pending, state => {
        state.loading = true;
      })

      .addCase(resendCodeVerifyRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.verify_register_success = true;
          state.error_border = false;
        }
      })

      .addCase(resendCodeVerifyRequest.rejected, (state, action) => {
        if (!action.payload.status) {

          state.loading = false;
        }
      });
  },
});

export default resendCodeVerifySlice.reducer;

