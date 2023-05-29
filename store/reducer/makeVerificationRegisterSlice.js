import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';

export const makeVerificationRegisterRequest = createAsyncThunk(
  'user_verification',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/user_verification`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const makeVerificationRegisterSlice = createSlice({
  name: 'user_verification',
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
      .addCase(makeVerificationRegisterRequest.pending, state => {
        state.loading = true;
        state.error_border = false;
      })

      .addCase(makeVerificationRegisterRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.verify_register_success = true;
          state.error_border = false;
        }
      })

      .addCase(makeVerificationRegisterRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          state.verify_register_error = true;
          state.loading = false;
          state.error_border = true;
        }
      });
  },
});

export default makeVerificationRegisterSlice.reducer;
export const {clearState, clearBorder} = makeVerificationRegisterSlice.actions;
