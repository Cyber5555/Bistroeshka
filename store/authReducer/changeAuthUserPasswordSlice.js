import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";

export const changeAuthUserPasswordRequest = createAsyncThunk(
  "change_password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/change_password_data`, data, {
        headers: { Authorization: "Bearer " + data.token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const changeAuthUserPasswordSlice = createSlice({
  name: "change_password",
  initialState: {
    old_password_error: "",
    new_password_error: "",
    new_password_confirmation_error: "",
    loading: false,

  },
  reducers: {
    clearState(state) {
      state.new_password_error = "";
      state.new_password_confirmation_error = "";
      state.loading = false;

    },
  },

  extraReducers: builder => {
    builder

      .addCase(changeAuthUserPasswordRequest.pending, state => {
        state.new_password_error = "";
        state.new_password_confirmation_error = "";
        state.loading = true;

      })

      .addCase(changeAuthUserPasswordRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
        }
      })

      .addCase(changeAuthUserPasswordRequest.rejected, (state, action) => {
        if (!action.payload.status) {

          state.loading = false;


          if (
            action.payload?.data?.old_password == "The old password field is required."
          ) {
            state.old_password_error = "Данные поля обязательны.";
          } else if (action.payload?.data?.old_password == "The old password must be at least 6 characters.") {
            state.old_password_error = "Пароль должен содержать не менее 6-ти символов.";
          } else if (action.payload?.message == "not valid old password") {
            state.old_password_error = "Неверный пароль.";
          }

          if (
            action.payload?.data?.new_password == "The new password field is required."
          ) {
            state.new_password_error = "Данные поля обязательны.";
          } else if (action.payload?.data?.new_password == "The new password must be at least 6 characters.") {
            state.new_password_error = "Пароль должен содержать не менее 6-ти символов.";
          }

          if (
            action.payload?.data?.new_password_confirmation == "The new password confirmation field is required."
          ) {
            state.new_password_confirmation_error = "Данные поля обязательны.";
          } else if (action.payload?.data?.new_password_confirmation == "The new password confirmation must be at least 6 characters.") {
            state.new_password_confirmation_error = "Пароль должен содержать не менее 6-ти символов.";
          } else if (action.payload?.message == "not valid confirm password") {
            state.new_password_confirmation_error = "Пароли не совпадают.";
          }

          // if (action.payload?.message?.password_confirmation?.length > 1) {
          //   if (action.payload?.message?.password_confirmation[1] == "The password confirmation must be at least 6 characters.") {
          //     state.new_password_confirmation_error = "Пароль должен содержать не менее 6-ти символов.";
          //   }
          // } else {
          //   if (action.payload?.message?.password_confirmation == "The password confirmation and password must match.") {
          //     state.new_password_confirmation_error = "Пароли не совпадают.";
          //   } else if (action.payload?.message?.password_confirmation == "The password confirmation field is required when password is present.") {
          //     state.new_password_confirmation_error = "Данные поля обязательны.";
          //   } else if (action.payload?.message?.password_confirmation == "The password confirmation field is required.") {
          //     state.new_password_confirmation_error = "Данные поля обязательны.";
          //   }
          // }
        }
      });
  },
});

export default changeAuthUserPasswordSlice.reducer;
export const { clearLoginState } = changeAuthUserPasswordSlice.actions;
