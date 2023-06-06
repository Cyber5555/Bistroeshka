import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const newPasswordForgotRequest = createAsyncThunk(
  "update_password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/update_password`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const newPasswordForgotSlice = createSlice({
  name: "update_password",
  initialState: {
    password_error: "",
    password_confirmation_error: "",
    loading: false,
    success_change_password: false,
  },
  reducers: {
    clearState(state) {
      state.password_error = "";
      state.password_confirmation_error = "";
      state.loading = false;
      state.success_change_password = false;
    },
  },

  extraReducers: builder => {
    builder

      .addCase(newPasswordForgotRequest.pending, state => {
        state.password_error = "";
        state.password_confirmation_error = "";
        state.loading = true;
        state.success_change_password = false;
      })

      .addCase(newPasswordForgotRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success_change_password = true;
          // AsyncStorage.setItem('userToken', action.payload.token);
        }
      })

      .addCase(newPasswordForgotRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          // console.log("action.payload--------------->>>>>", action.payload, "action.payload<<<---------------");
          state.loading = false;

          state.success_change_password = false;
          console.log(action.payload);


          if (
            action.payload?.message?.password == "The password field is required."
          ) {
            state.password_error = "Данные поля обязательны.";
          } else if (action.payload?.message?.password == "The password must be at least 6 characters.") {
            state.password_error = "Пароль должен содержать не менее 6-ти символов.";
          }

          if (action.payload?.message?.password_confirmation?.length > 1) {
            if (action.payload?.message?.password_confirmation[1] == "The password confirmation must be at least 6 characters.") {
              state.password_confirmation_error = "Пароль должен содержать не менее 6-ти символов.";
            }
          } else {
            if (action.payload?.message?.password_confirmation == "The password confirmation and password must match.") {
              state.password_confirmation_error = "Пароли не совпадают.";
            } else if (action.payload?.message?.password_confirmation == "The password confirmation field is required when password is present.") {
              state.password_confirmation_error = "Данные поля обязательны.";
            } else if (action.payload?.message?.password_confirmation == "The password confirmation field is required.") {
              state.password_confirmation_error = "Данные поля обязательны.";
            }
          }
        }
      });
  },
});

export default newPasswordForgotSlice.reducer;
export const { clearState } = newPasswordForgotSlice.actions;
