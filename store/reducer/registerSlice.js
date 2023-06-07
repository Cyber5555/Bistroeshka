import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";

export const registerRequest = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/registration`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    password_error: "",
    phone_error: "",
    loading: false,
    success_register: false,
  },
  reducers: {
    clearErrorMessage(state) {
      state.address_error = "";
      state.password_confirmation_error = "";
      state.password_error = "";
      state.paternity_error = "";
      state.phone_error = "";
      state.name_error = "";
      state.surname_error = "";
      state.success_register = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerRequest.pending, state => {
        state.loading = true;
      })

      .addCase(registerRequest.fulfilled, (state, action) => {
        // if (action.payload.status) {
        state.loading = false;
        state.success_register = true;
        // }
      })

      .addCase(registerRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          state.loading = false;
          if (action.payload?.data) {
            let error = action.payload?.data;
            if (error?.address == "The address field is required.") {
              state.address_error = "Обязательное поле";
            }

            if (error?.lastName == "The last name field is required.") {
              state.surname_error = "Обязательное поле";
            }

            if (error?.name == "The name field is required.") {
              state.name_error = "Обязательное поле";
            }

            if (error?.surname == "The surname field is required.") {
              state.paternity_error = "Обязательное поле";
            }

            if (error?.password == "The password field is required.") {
              state.password_error = "Обязательное поле";
            } else if (error?.password) {
              if (
                error?.password[0] ==
                "The password must be at least 6 characters."
              ) {
                state.password_error =
                  "Пароль должен содержать не менее 6-ти символов.";
              } else if (
                error?.password[0] ==
                "The password confirmation does not match."
              ) {
                state.password_confirmation_error = "Пароли не совпадают.";
              } else {
                state.password_error = "";
              }
            } else {
              state.password_error = "";
            }

            if (
              error?.password_confirmation ==
              "The password confirmation field is required."
            ) {
              state.password_confirmation_error = "Обязательное поле";
            }

            if (error?.phone == "The phone field is required.") {
              state.phone_error = "Обязательное поле";
            } else if (
              error?.phone == "The phone must be at least 18 characters."
            ) {
              state.phone_error = "Введите корректный номер телефона.";
            } else if (error?.phone == "The phone has already been taken.") {
              state.phone_error = "Этот телефон уже зарегистрирован. ";
            }
          }
        }
      });
  },
});

export default registerSlice.reducer;
export const { clearErrorMessage } = registerSlice.actions;

